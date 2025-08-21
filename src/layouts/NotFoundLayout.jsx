import Container from "@/components/global/container";
import { Header, Footer } from '@/components/index'
export default function NotFoundLayout({ children }) {
    return (
        <>
            <Header />
            <Container>
                {children}
            </Container>
            <Footer />
        </>
    );
}
