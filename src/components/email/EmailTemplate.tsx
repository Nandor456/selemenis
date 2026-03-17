import * as React from "react";

interface EmailTemplateProps {
  name: string;
  email: string;
  phone: string;
  type: string;
  message: string;
}

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

  const field = (label: string, value: string) => (
    <tr key={label}>
      <td
        style={{
          padding: "0",
          paddingBottom: "1px",
        }}
      >
        <table
          width="100%"
          cellPadding="0"
          cellSpacing="0"
          style={{ borderCollapse: "collapse" }}
        >
          <tbody>
            <tr>
              <td
                width="110"
                style={{
                  backgroundColor: bg,
                  padding: "10px 14px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
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
                style={{
                  backgroundColor: "#ffffff",
                  padding: "10px 14px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "13px",
                  color: dark,
                  verticalAlign: "top",
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
    <div
      style={{
        backgroundColor: "#e8e3dd",
        padding: "40px 20px",
        fontFamily: "Georgia, 'Times New Roman', serif",
      }}
    >
      {/* Outer wrapper */}
      <table
        width="100%"
        cellPadding="0"
        cellSpacing="0"
        style={{
          maxWidth: "580px",
          margin: "0 auto",
          borderCollapse: "collapse",
        }}
      >
        <tbody>
          {/* ── HEADER ── */}
          <tr>
            <td
              style={{
                backgroundColor: dark,
                padding: "0",
                overflow: "hidden",
              }}
            >
              {/* Top accent bar */}
              <table
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
                      }}
                    />
                  </tr>
                  <tr>
                    <td style={{ padding: "32px 36px 28px" }}>
                      {/* Logo / Brand row */}
                      <table
                        width="100%"
                        cellPadding="0"
                        cellSpacing="0"
                        style={{ borderCollapse: "collapse" }}
                      >
                        <tbody>
                          <tr>
                            <td>
                              <p
                                style={{
                                  margin: "0 0 4px",
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
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
                                style={{
                                  margin: "0",
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
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
                              style={{
                                textAlign: "right" as const,
                                verticalAlign: "bottom",
                              }}
                            >
                              <p
                                style={{
                                  margin: "0",
                                  fontFamily:
                                    "Georgia, 'Times New Roman', serif",
                                  fontSize: "9px",
                                  letterSpacing: "3px",
                                  textTransform: "uppercase" as const,
                                  color: accent,
                                  fontWeight: "700",
                                }}
                              >
                                {type}
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

          {/* ── GREETING BAND ── */}
          <tr>
            <td
              style={{
                backgroundColor: accent,
                padding: "16px 36px",
              }}
            >
              <p
                style={{
                  margin: "0",
                  fontFamily: "Georgia, 'Times New Roman', serif",
                  fontSize: "13px",
                  color: "#ffffff",
                  letterSpacing: "0.3px",
                }}
              >
                You have received a new enquiry from{" "}
                <strong style={{ fontWeight: "700" }}>{name}</strong>.
              </p>
            </td>
          </tr>

          {/* ── CONTACT DETAILS ── */}
          <tr>
            <td style={{ padding: "0" }}>
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ borderCollapse: "collapse" }}
              >
                <tbody>
                  {/* Section label */}
                  <tr>
                    <td
                      style={{
                        backgroundColor: bg,
                        padding: "20px 36px 10px",
                        fontFamily: "Georgia, 'Times New Roman', serif",
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
                  {/* Fields table */}
                  <tr>
                    <td style={{ padding: "0 36px", backgroundColor: bg }}>
                      <table
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
                          {field("Name", name)}
                          {field("Email", email)}
                          {field("Phone", phone)}
                          {field("Project Type", type)}
                        </tbody>
                      </table>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ── MESSAGE ── */}
          <tr>
            <td style={{ backgroundColor: bg, padding: "24px 36px 0" }}>
              <p
                style={{
                  margin: "0 0 10px",
                  fontFamily: "Georgia, 'Times New Roman', serif",
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
                        fontFamily: "Georgia, 'Times New Roman', serif",
                        fontSize: "14px",
                        lineHeight: "1.7",
                        color: dark,
                      }}
                    >
                      {message}
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ── CTA ── */}
          <tr>
            <td style={{ backgroundColor: bg, padding: "28px 36px" }}>
              <table
                cellPadding="0"
                cellSpacing="0"
                style={{ borderCollapse: "collapse" }}
              >
                <tbody>
                  <tr>
                    <td
                      style={{
                        backgroundColor: dark,
                        padding: "12px 28px",
                      }}
                    >
                      <a
                        href={`mailto:${email}`}
                        style={{
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "11px",
                          fontWeight: "700",
                          letterSpacing: "3px",
                          textTransform: "uppercase" as const,
                          color: "#ffffff",
                          textDecoration: "none",
                        }}
                      >
                        Reply to {name} →
                      </a>
                    </td>
                  </tr>
                </tbody>
              </table>
            </td>
          </tr>

          {/* ── FOOTER ── */}
          <tr>
            <td
              style={{
                backgroundColor: dark,
                padding: "20px 36px",
                borderTop: `1px solid rgba(255,255,255,0.06)`,
              }}
            >
              <table
                width="100%"
                cellPadding="0"
                cellSpacing="0"
                style={{ borderCollapse: "collapse" }}
              >
                <tbody>
                  <tr>
                    <td>
                      <p
                        style={{
                          margin: "0",
                          fontFamily: "Georgia, 'Times New Roman', serif",
                          fontSize: "10px",
                          color: "rgba(255,255,255,0.25)",
                          letterSpacing: "1px",
                        }}
                      >
                        This message was submitted via the contact form on your
                        website.
                      </p>
                    </td>
                    <td style={{ textAlign: "right" as const }}>
                      <p
                        style={{
                          margin: "0",
                          fontFamily: "Georgia, 'Times New Roman', serif",
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
    </div>
  );
}
