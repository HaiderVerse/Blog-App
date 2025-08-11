export default function NotFoundLayout({ children }) {
    return (
        <div style={{ textAlign: "center", padding: "50px" }}>
            {/* No header/footer here, totally separate look */}
            {children}
        </div>
    );
}
