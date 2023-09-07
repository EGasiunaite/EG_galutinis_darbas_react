export default function LoginForm() {
    return (
        <div>
            <h2>Login here</h2>
            <form>
                <input type="text" placeholder="your email" />
                <input type="password" placeholder="your password" />
                <button type="submit">Login</button>
            </form>
        </div>
    );
}