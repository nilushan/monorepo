import { signupAction } from "./actions";

// type Props = {
//   params: Record<string, never>;
//   // searchParams: { [key: string]: string | string[] | undefined };
// };

// export default async function SignupPage(props: Props) {
  export default async function SignupPage() {

  // const error = typeof props.searchParams?.error === 'string' ? props.searchParams.error : undefined;

  return (
    <div style={{ maxWidth: 400, margin: "2rem auto", padding: 24, border: "1px solid #ccc", borderRadius: 8 }}>
      <h2>Sign Up</h2>
      <form action={signupAction}>
        <label>
          Name
          <input
            name="name"
            type="text"
            autoComplete="name"
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          Email
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <label>
          Password
          <input
            name="password"
            type="password"
            autoComplete="new-password"
            required
            style={{ width: "100%", marginBottom: 12 }}
          />
        </label>
        <button type="submit" style={{ width: "100%", padding: 8 }}>
          Sign Up
        </button>
        {/* {error && <div style={{ color: "red", marginTop: 12 }}>{error}</div>} */}
      </form>
      <div style={{ marginTop: 16 }}>
        Already have an account? <a href="/login">Sign in</a>
      </div>
    </div>
  );
}