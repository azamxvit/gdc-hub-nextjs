import type { AuthError } from "@supabase/supabase-js";

/** Человекочитаемые сообщения для UI (Supabase Auth). */
export function mapAuthError(error: AuthError): string {
  const code = error.code;
  const fallback = error.message || "Ошибка авторизации";

  const byCode: Record<string, string> = {
    invalid_credentials: "Неверный email или пароль",
    email_not_confirmed: "Подтвердите email по ссылке из письма",
    user_already_exists: "Этот email уже зарегистрирован",
    weak_password: "Слишком слабый пароль",
    invalid_email: "Некорректный email",
    signup_disabled: "Регистрация временно отключена",
    otp_expired: "Ссылка устарела — запросите новую",
    flow_state_expired: "Сессия входа устарела — нажмите «Продолжить с Google» ещё раз.",
    identity_already_exists: "Этот email уже привязан к другому способу входа. Войдите по паролю.",
  };

  if (code && byCode[code]) return byCode[code];

  if (/invalid login credentials/i.test(fallback)) {
    return "Неверный email или пароль";
  }
  if (/user already registered/i.test(fallback)) {
    return "Этот email уже зарегистрирован";
  }

  return fallback;
}
