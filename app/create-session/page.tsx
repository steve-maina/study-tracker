import SessionCreate from "@/components/SessionCreate";
import { Session } from "inspector/promises";

export default function Page() {
    return (
        <main className="flex justify-center items-center h-screen">
            <SessionCreate />
        </main>
    )
}