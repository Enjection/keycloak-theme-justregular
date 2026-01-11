import { useState, type FormEventHandler } from "react";
import type { PageProps } from "keycloakify/login/pages/PageProps";
import type { KcContext } from "../KcContext";
import type { I18n } from "../i18n";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/shared/components/Card";
import { Button } from "@/shared/components/Button";
import { Input } from "@/shared/components/Input";
import { Key } from "lucide-react";

export default function Login(
  props: PageProps<Extract<KcContext, { pageId: "login.ftl" }>, I18n>
) {
  const { kcContext, i18n, Template: _Template, doUseDefaultCss: _doUseDefaultCss } = props;
  void _Template;
  void _doUseDefaultCss;
  const { realm, url, usernameHidden, login, registrationDisabled, messagesPerField } = kcContext;
  const { msg, msgStr } = i18n;

  const [isLoginButtonDisabled, setIsLoginButtonDisabled] = useState(false);

  const onSubmit: FormEventHandler<HTMLFormElement> = () => {
    setIsLoginButtonDisabled(true);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      {/* Background stars effect */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        {Array.from({ length: 50 }).map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white/20 rounded-full"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              opacity: Math.random() * 0.5 + 0.1,
            }}
          />
        ))}
      </div>

      <Card className="w-full max-w-md relative z-10">
        <CardHeader className="space-y-1 text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="p-3 rounded-full bg-secondary">
              <Key className="h-8 w-8 text-foreground" />
            </div>
          </div>
          <CardTitle>{msg("loginAccountTitle")}</CardTitle>
          <CardDescription>
            Sign in to access justregular.dev
          </CardDescription>
        </CardHeader>

        <CardContent>
          {/* Error messages */}
          {messagesPerField.existsError("username", "password") && (
            <div className="mb-4 p-3 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm">
              {messagesPerField.getFirstError("username", "password")}
            </div>
          )}

          <form
            id="kc-form-login"
            action={url.loginAction}
            method="post"
            onSubmit={onSubmit}
          >
            <div className="space-y-4">
              {!usernameHidden && (
                <div className="space-y-2">
                  <label htmlFor="username" className="text-sm font-medium">
                    {!realm.loginWithEmailAllowed
                      ? msg("username")
                      : !realm.registrationEmailAsUsername
                      ? msg("usernameOrEmail")
                      : msg("email")}
                  </label>
                  <Input
                    id="username"
                    name="username"
                    defaultValue={login.username ?? ""}
                    type="text"
                    autoFocus
                    autoComplete="username"
                    aria-invalid={messagesPerField.existsError("username")}
                    placeholder={msgStr("username")}
                  />
                </div>
              )}

              <div className="space-y-2">
                <label htmlFor="password" className="text-sm font-medium">
                  {msg("password")}
                </label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={messagesPerField.existsError("password")}
                  placeholder="Enter your password"
                />
              </div>

              <div className="flex items-center justify-between">
                {realm.rememberMe && !usernameHidden && (
                  <div className="flex items-center space-x-2">
                    <input
                      id="rememberMe"
                      name="rememberMe"
                      type="checkbox"
                      className="h-4 w-4 rounded border-border bg-input accent-primary"
                      defaultChecked={login.rememberMe === "on"}
                    />
                    <label htmlFor="rememberMe" className="text-sm text-muted-foreground">
                      {msg("rememberMe")}
                    </label>
                  </div>
                )}
                {realm.resetPasswordAllowed && (
                  <a
                    href={url.loginResetCredentialsUrl}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {msg("doForgotPassword")}
                  </a>
                )}
              </div>

              <Button
                type="submit"
                className="w-full"
                disabled={isLoginButtonDisabled}
              >
                {isLoginButtonDisabled ? (
                  <span className="flex items-center gap-2">
                    <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="none"
                      />
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      />
                    </svg>
                    Signing in...
                  </span>
                ) : (
                  msg("doLogIn")
                )}
              </Button>
            </div>
          </form>

          {realm.password && realm.registrationAllowed && !registrationDisabled && (
            <div className="mt-6 text-center text-sm text-muted-foreground">
              {msg("noAccount")}{" "}
              <a
                href={url.registrationUrl}
                className="text-foreground hover:underline"
              >
                {msg("doRegister")}
              </a>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
