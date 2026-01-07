import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

export default function BaseCard({ card, badges }) {
  const findBadge = (badgeId) => badges.find((b) => b.id === badgeId);

  return (
    <div className="card rounded-4 bg-gray-0 border-gray-200 mb-4">
      <div className="card-body p-lg-6">
        <span
          className={`badge badge-${findBadge(card.badgeId).ui} lh-base mb-4`}
        >
          {findBadge(card.badgeId).text}
        </span>
        <ReactMarkdown>{card.title}</ReactMarkdown>
        <ReactMarkdown
          // 客製化樣式
          components={{
            // node 該元素在語法樹中的原始資料物件；props 物件，此 HTML 標籤應該要有的所有屬性
            ul: ({ node, ...props }) => <ul className="mb-0" {...props} />,
            hr: ({ node }) => <hr className="my-3" />,
            // 取消外層預設的 pre 標籤
            pre: ({ children }) => <>{children}</>,
            code: ({ node, className, children, ...props }) => {
              const language = className?.replace("language-", "") || "";

              return language ? (
                <SyntaxHighlighter
                  style={prism}
                  language={language}
                  PreTag="pre"
                  codeTagProps={{
                    style: {
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
