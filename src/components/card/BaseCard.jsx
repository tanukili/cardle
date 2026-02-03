import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";

export default function BaseCard({ card, badges, mode = "base" }) {
  // 卡片三種顯示模式：base、titleOnly、withBadge
  const findBadge = (badgeId) => badges?.find((b) => b.id === badgeId);

  const cardStyle = {
    base: "card rounded-4 bg-gray-0 border-gray-500 mb-4",
    titleOnly: "card rounded-4 bg-gray-0 border-gray-200 mb-4",
    withBadge: "card rounded-4 bg-gray-0 border-gray-200 mb-4",
  };

  const brandTheme = {
    'code[class*="language-"]': {
      color: "var(--bs-gray-900)",
    },
    keyword: {
      color: "var(--bs-primary)",
    },
    function: {
      color: "var(--bs-secondary)",
    },
    string: {
      color: "var(--bs-tag-success)",
    },
    number: {
      color: "var(--bs-primary-400)",
    },
    punctuation: { color: "var(--bs-gray-500)" },
  };

  return (
    <div className={cardStyle[mode]}>
      <div className="card-header">
        <h3 className="fs-m text-center lh-base tracking-2">{card.title}</h3>
      </div>
      <div className="card-body p-lg-6">
        {/* <span
          className={`badge badge-${findBadge(card.badgeId).ui} lh-base mb-4`}
        >
          {findBadge(card.badgeId).text}
        </span> */}
        {/* <ReactMarkdown>{card.title}</ReactMarkdown> */}
        <ReactMarkdown
          // 客製化樣式
          components={{
            // node 是該元素在語法樹中的原始資料物件；props 物件是此 HTML 標籤應該要有的所有屬性
            ul: ({ node, ...props }) => <ul className="list-unstyled mb-0 ps-6" {...props} />,
            hr: ({ node }) => <hr className="my-3" />,
            // 取消外層預設的 pre 標籤
            pre: ({ children }) => <>{children}</>,
            code: ({ node, className, children, ...props }) => {
              const language = className?.replace("language-", "") || "";

              return language ? (
                <SyntaxHighlighter
                  style={brandTheme}
                  customStyle={{
                    backgroundColor: "var(--bs-gray-50)",
                    borderRadius: "var(--bs-border-radius-sm)",
                    padding: ".75rem",
                    fontWeight: "500",
                    marginTop: "1rem",
                  }}
                  language={language}
                  PreTag="pre"
                  codeTagProps={{
                    style: {
                      color: "var(--bs-gray-900)",
                      whiteSpace: "pre-wrap",
                      wordBreak: "break-all",
                    },
                  }}
                  {...props}
                >
                  {children}
                </SyntaxHighlighter>
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        >
          {card.content}
        </ReactMarkdown>
      </div>
    </div>
  );
}
