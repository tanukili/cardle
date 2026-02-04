import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BaseCard({ card, badges, mode = "base" }) {
  // 卡片三種顯示模式：base、titleOnly、withBadge
  const cardStyle = {
    base: " border-gray-500",
    titleOnly: "border-gray-500",
    withBadge: "border-gray-200",
  };

  const brandTheme = {
    'code[class*="language-"]': { color: "var(--bs-gray-900)" },
    keyword: { color: "var(--bs-primary)" },
    function: { color: "var(--bs-secondary)" },
    string: { color: "var(--bs-tag-success)" },
    number: { color: "var(--bs-primary-400)" },
    punctuation: { color: "var(--bs-gray-500)" },
  };

  const CardHeader = () => {
    const titleOnlyClass = {
      header: mode === "titleOnly" ? "border-bottom-0" : "",
      title: mode === "titleOnly" ? "fw-normal" : "",
    };

    return (
      <div className={`card-header ${titleOnlyClass.header}`}>
        <h3 className={`fs-m text-center lh-base tracking-2 ${titleOnlyClass.title}`}>
          {card.title}
        </h3>
      </div>
    );
  };

  const listStyle = {
    "&::before": {
      content: "•",
      color: "var(--bs-gray-500)",
      fontSize: "0.875rem",
      marginRight: "0.5rem",
    },
  };

  // 程式碼區塊相關
  const codeTheme = {
    container: {
      backgroundColor: "var(--bs-gray-50)",
      borderRadius: "var(--bs-border-radius-sm)",
      padding: ".75rem",
      fontWeight: "500",
      marginTop: "1rem",
      fontSize: ".875rem",
    },
    codeLine: {
      color: "var(--bs-gray-900)",
      whiteSpace: "pre-wrap",
      wordBreak: "break-all",
    },
  };

  const codeSettings = ({node, className, children, ...props }) => {
    const language = className?.replace("language-", "") || "";

    if (!language) {
      return (
        <code className={className} {...props}>
          {children}
        </code>
      );
    }

    return (
      <SyntaxHighlighter
        language={language}
        PreTag="pre"
        customStyle={codeTheme.container}
        codeTagProps={{ style: codeTheme.codeLine }}
        {...props}
      >
        {String(children).replace(/\n$/, "")}
      </SyntaxHighlighter>
    );
  };

  const MarkdownContent = (mode) => {
    return (
      <>
        <ReactMarkdown
          // 客製化樣式：node 是該元素在語法樹中的原始資料物件；props 物件是此 HTML 標籤應該要有的所有屬性
          components={{
            ul: ({ node, ...props }) => (
              <ul className="list-unstyled card-ul-style mb-0" {...props} />
            ),
            ol: ({ node, ...props }) => (
              <ol className="mb-0 ps-6" {...props} />
            ),
            // 取消外層預設的 pre 標籤
            pre: ({ children }) => <>{children}</>,
            code: codeSettings,
          }}
        >
          {card.content}
        </ReactMarkdown>
      </>
    );
  };

  // withBadge only
  const BadgeContent = ({ cardBox }) => {
    console.log(cardBox);
    return (
      <>
        <span className={`badge badge-${cardBox.color} lh-base mb-4`}>
          {cardBox.title}
        </span>
        <h3 className="fs-m fw-normal mb-2">{card.title}</h3>
      </>
    );
  };

  return (
    <div className={`${cardStyle[mode]} card rounded-4 bg-gray-0`}>
      {mode !== "withBadge" && <CardHeader mode={mode} />}
      {mode !== "titleOnly" && (
        <div className="card-body p-lg-6">
          {mode === "withBadge" && <BadgeContent cardBox={card.cardBox} />}
          <MarkdownContent mode={mode} />
        </div>
      )}
    </div>
  );
}
