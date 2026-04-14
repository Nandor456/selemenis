/* eslint-disable @next/next/no-head-element */
import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

const fontFamily = "Georgia, 'Times New Roman', serif";

const normalizeValue = (value: string | null | undefined, fallback: string) => {
  const trimmed = typeof value === "string" ? value.trim() : "";
  return trimmed || fallback;
};

const renderMessageLines = (message: string) =>
  message.split(/\r?\n/).map((line, index, lines) => (
    <React.Fragment key={`${index}-${line}`}>
      {line || <span>&nbsp;</span>}
      {index < lines.length - 1 ? <br /> : null}
    </React.Fragment>
  ));

export function EmailTemplate({
  name,
  email,
  phone,
  type,
  message,
}: EmailTemplateProps) {
  const accent = "#08818d";
  const dark = "#1C1C1E";
  const muted = "#6b7280";
  const border = "#e5e0d8";
  const bg = "#f5f0ea";

  const rawEmail = typeof email === "string" ? email.trim() : "";
  const safeName = normalizeValue(name, "Unknown Sender");
  const safeEmail = normalizeValue(email, "Not provided");
  const safePhone = normalizeValue(phone, "Not provided");
  const safeType = normalizeValue(type, "Website Enquiry");
  const safeMessage = normalizeValue(message, "No message provided.");
  const replyHref =
    rawEmail !== ""
      ? `mailto:${rawEmail}?subject=${encodeURIComponent(`Re: ${safeType}`)}`
      : null;
  const previewText = `${safeType} enquiry from ${safeName}`;

  const field = (label: string, value: string) => (
    <tr key={label}>
      <td style={{ padding: "0", paddingBottom: "1px" }}>
        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ borderCollapse: "collapse" }}
        >
          <tbody>
            <tr className="field-row">
              <td
                width="120"
                className="field-label"
                style={{
                  backgroundColor: bg,
                  padding: "10px 14px",
                  fontFamily,
                  fontSize: "10px",
                  fontWeight: "700",
                  letterSpacing: "2px",
                  textTransform: "uppercase" as const,
                  color: muted,
                  verticalAlign: "top",
                  borderRight: `1px solid ${border}`,
                  whiteSpace: "nowrap" as const,
                }}
              >
                {label}
              </td>
              <td
                className="field-value"
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px 14px",
                  fontFamily,
                  fontSize: "13px",
                  color: dark,
                  verticalAlign: "top",
                  overflowWrap: "break-word",
                }}
              >
                {value}
              </td>
            </tr>
          </tbody>
        </table>
      </td>
    </tr>
  );

  return (
    <html lang="en">
      <head>
        <meta httpEquiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <style>{`
          @media only screen and (max-width: 600px) {
            .email-shell {
              width: 100% !important;
            }

            .mobile-shell-pad {
              padding: 24px 12px !important;
            }

            .mobile-header-pad {
              padding: 28px 20px 24px !important;
            }

            .mobile-band,
            .mobile-pad,
            .mobile-section-label,
            .mobile-footer-pad {
              padding-left: 20px !important;
              padding-right: 20px !important;
            }

            .mobile-band {
              padding-top: 14px !important;
              padding-bottom: 14px !important;
            }

            .mobile-message-pad {
              padding: 24px 20px 0 !important;
            }

            .stack-column {
              display: block !important;
              width: 100% !important;
              text-align: left !important;
            }

            .stack-gap {
              padding-top: 16px !important;
            }

            .field-label,
            .field-value {
              display: block !important;
              width: 100% !important;
              box-sizing: border-box !important;
            }

            .field-row {
              display: block !important;
            }

            .field-label {
              border-right: 0 !important;
              border-bottom: 1px solid ${border} !important;
              white-space: normal !important;
              padding-bottom: 8px !important;
            }

            .field-value {
              padding-top: 8px !important;
              line-height: 1.5 !important;
              word-break: break-word !important;
            }

            .cta-table,
            .cta-table tbody,
            .cta-table tr,
            .cta-cell,
            .cta-link {
              width: 100% !important;
              display: block !important;
              box-sizing: border-box !important;
            }

            .cta-link {
              text-align: center !important;
            }

            .footer-stack {
              display: block !important;
              width: 100% !important;
              text-align: left !important;
            }

            .footer-secondary {
              padding-top: 12px !important;
            }

            .mobile-title {
              font-size: 22px !important;
            }

            .mobile-eyebrow {
              letter-spacing: 3px !important;
            }
          }
        `}</style>
      </head>
      <body
        style={{
          margin: "0",
          padding: "0",
          backgroundColor: "#e8e3dd",
          fontFamily,
        }}
      >
        <div
          style={{
            display: "none",
            maxHeight: "0",
            maxWidth: "0",
            overflow: "hidden",
            opacity: "0",
            lineHeight: "1px",
          }}
        >
          {previewText}
        </div>

        <table
          role="presentation"
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ borderCollapse: "collapse", backgroundColor: "#e8e3dd" }}
        >
          <tbody>
            <tr>
              <td className="mobile-shell-pad" style={{ padding: "40px 20px" }}>
                <table
                  role="presentation"
                  align="center"
                  width="100%"
                  cellPadding="0"
                  cellSpacing="0"
                  className="email-shell"
                  style={{
                    width: "100%",
                    maxWidth: "580px",
                    margin: "0 auto",
                    borderCollapse: "collapse",
                  }}
                >
                  <tbody>
                    <tr>
                      <td
                        style={{
                          backgroundColor: dark,
                          padding: "0",
                          overflow: "hidden",
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ borderCollapse: "collapse" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: accent,
                                  height: "4px",
                                  padding: "0",
                                  fontSize: "0",
                                  lineHeight: "0",
                                }}
                              >
                                &nbsp;
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="mobile-header-pad"
                                style={{ padding: "32px 36px 28px" }}
                              >
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                  style={{ borderCollapse: "collapse" }}
                                >
                                  <tbody>
                                    <tr>
                                      <td
                                        className="stack-column"
                                        style={{ verticalAlign: "top" }}
                                      >
                                        <p
                                          className="mobile-eyebrow"
                                          style={{
                                            margin: "0 0 4px",
                                            fontFamily,
                                            fontSize: "9px",
                                            letterSpacing: "5px",
                                            textTransform: "uppercase" as const,
                                            color: "rgba(255,255,255,0.35)",
                                            fontWeight: "700",
                                          }}
                                        >
                                          New Enquiry
                                        </p>
                                        <p
                                          className="mobile-title"
                                          style={{
                                            margin: "0",
                                            fontFamily,
                                            fontSize: "26px",
                                            fontWeight: "700",
                                            color: "#ffffff",
                                            letterSpacing: "1px",
                                            lineHeight: "1.1",
                                          }}
                                        >
                                          Project Request
                                        </p>
                                      </td>
                                      <td
                                        className="stack-column stack-gap"
                                        style={{
                                          textAlign: "right" as const,
                                          verticalAlign: "bottom",
                                        }}
                                      >
                                        <p
                                          style={{
                                            margin: "0",
                                            fontFamily,
                                            fontSize: "9px",
                                            letterSpacing: "3px",
                                            textTransform: "uppercase" as const,
                                            color: accent,
                                            fontWeight: "700",
                                          }}
                                        >
                                          {safeType}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        className="mobile-band"
                        style={{
                          backgroundColor: accent,
                          padding: "16px 36px",
                        }}
                      >
                        <p
                          style={{
                            margin: "0",
                            fontFamily,
                            fontSize: "13px",
                            color: "#ffffff",
                            letterSpacing: "0.3px",
                            lineHeight: "1.5",
                          }}
                        >
                          You have received a new enquiry from{" "}
                          <strong style={{ fontWeight: "700" }}>
                            {safeName}
                          </strong>
                          .
                        </p>
                      </td>
                    </tr>

                    <tr>
                      <td style={{ padding: "0" }}>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ borderCollapse: "collapse" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="mobile-section-label"
                                style={{
                                  backgroundColor: bg,
                                  padding: "20px 36px 10px",
                                  fontFamily,
                                  fontSize: "9px",
                                  fontWeight: "700",
                                  letterSpacing: "4px",
                                  textTransform: "uppercase" as const,
                                  color: accent,
                                }}
                              >
                                Contact Details
                              </td>
                            </tr>
                            <tr>
                              <td
                                className="mobile-pad"
                                style={{
                                  padding: "0 36px",
                                  backgroundColor: bg,
                                }}
                              >
                                <table
                                  role="presentation"
                                  width="100%"
                                  cellPadding="0"
                                  cellSpacing="0"
                                  style={{
                                    borderCollapse: "collapse",
                                    border: `1px solid ${border}`,
                                    overflow: "hidden",
                                  }}
                                >
                                  <tbody>
                                    {field("Name", safeName)}
                                    {field("Email", safeEmail)}
                                    {field("Phone", safePhone)}
                                    {field("Project Type", safeType)}
                                  </tbody>
                                </table>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    <tr>
                      <td
                        className="mobile-message-pad"
                        style={{ backgroundColor: bg, padding: "24px 36px 0" }}
                      >
                        <p
                          style={{
                            margin: "0 0 10px",
                            fontFamily,
                            fontSize: "9px",
                            fontWeight: "700",
                            letterSpacing: "4px",
                            textTransform: "uppercase" as const,
                            color: accent,
                          }}
                        >
                          Message
                        </p>
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{
                            borderCollapse: "collapse",
                            border: `1px solid ${border}`,
                            borderLeft: `3px solid ${accent}`,
                          }}
                        >
                          <tbody>
                            <tr>
                              <td
                                style={{
                                  backgroundColor: "#ffffff",
                                  padding: "16px 18px",
                                  fontFamily,
                                  fontSize: "14px",
                                  lineHeight: "1.7",
                                  color: dark,
                                  overflowWrap: "break-word",
                                }}
                              >
                                {renderMessageLines(safeMessage)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>

                    {replyHref ? (
                      <tr>
                        <td
                          className="mobile-pad"
                          style={{ backgroundColor: bg, padding: "28px 36px" }}
                        >
                          <table
                            role="presentation"
                            width="auto"
                            cellPadding="0"
                            cellSpacing="0"
                            className="cta-table"
                            style={{ borderCollapse: "collapse" }}
                          >
                            <tbody>
                              <tr>
                                <td
                                  className="cta-cell"
                                  style={{
                                    backgroundColor: dark,
                                    padding: "12px 28px",
                                  }}
                                >
                                  <a
                                    href={replyHref}
                                    className="cta-link"
                                    style={{
                                      fontFamily,
                                      fontSize: "11px",
                                      fontWeight: "700",
                                      letterSpacing: "3px",
                                      textTransform: "uppercase" as const,
                                      color: "#ffffff",
                                      textDecoration: "none",
                                    }}
                                  >
                                    Reply to {safeName} →
                                  </a>
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </td>
                      </tr>
                    ) : null}

                    <tr>
                      <td
                        className="mobile-footer-pad"
                        style={{
                          backgroundColor: dark,
                          padding: "20px 36px",
                          borderTop: "1px solid rgba(255,255,255,0.06)",
                        }}
                      >
                        <table
                          role="presentation"
                          width="100%"
                          cellPadding="0"
                          cellSpacing="0"
                          style={{ borderCollapse: "collapse" }}
                        >
                          <tbody>
                            <tr>
                              <td
                                className="footer-stack"
                                style={{ verticalAlign: "top" }}
                              >
                                <p
                                  style={{
                                    margin: "0",
                                    fontFamily,
                                    fontSize: "10px",
                                    color: "rgba(255,255,255,0.25)",
                                    letterSpacing: "1px",
                                    lineHeight: "1.6",
                                  }}
                                >
                                  This message was submitted via the contact
                                  form on your website.
                                </p>
                              </td>
                              <td
                                className="footer-stack footer-secondary"
                                style={{
                                  textAlign: "right" as const,
                                  verticalAlign: "top",
                                }}
                              >
                                <p
                                  style={{
                                    margin: "0",
                                    fontFamily,
                                    fontSize: "10px",
                                    color: accent,
                                    letterSpacing: "2px",
                                    fontWeight: "700",
                                    textTransform: "uppercase" as const,
                                  }}
                                >
                                  Built With Pride
                                </p>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </body>
    </html>
  );
}
