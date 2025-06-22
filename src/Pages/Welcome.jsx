import React, { useState } from "react";

const AccordionItem = ({ title, content }) => {
    const [open, setOpen] = useState(false);
    return (
        <div className="mb-4 border border-green-100 rounded">
            <button
                onClick={() => setOpen(!open)}
                className={`w-full text-left px-6 py-4 font-semibold flex justify-between items-center ${
                    open
                        ? "bg-green-100 text-green-800"
                        : "bg-green-50 text-green-700"
                }`}
            >
                {title}
                <span>{open ? "-" : "+"}</span>
            </button>
            {open && (
                <div className="bg-white px-6 py-4 text-gray-700 text-sm">
                    {content}
                </div>
            )}
        </div>
    );
};

const Welcome = () => {
    return (
        <div className="font-sans text-gray-800">
            {/* Navbar */}
            <header className="bg-white shadow sticky top-0 z-50">
                <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">
                    <div className="flex items-center gap-3">
                        <img
                            src="/images/logo.PNG"
                            alt="Logo UPNVJ"
                            className="h-10"
                        />
                        <div className="text-sm leading-4">
                            <p className="text-green-700 font-bold">
                                UNIT LAYANAN TERPADU
                            </p>
                            <p className="text-green-900 font-bold">
                                UPN VETERAN JAKARTA
                            </p>
                        </div>
                    </div>
                    <nav className="hidden md:flex gap-6 text-sm font-medium">
                        <a href="#" className="text-green-700 font-bold">
                            BERANDA
                        </a>
                        <a href="#" className="hover:text-green-600">
                            PROFIL
                        </a>
                        <a href="#" className="hover:text-green-600">
                            LAYANAN
                        </a>
                        <a href="#" className="hover:text-green-600">
                            PENMARU
                        </a>
                        <a href="#" className="hover:text-green-600">
                            PROSEDUR LAYANAN
                        </a>
                        <a href="#" className="hover:text-green-600">
                            PPID
                        </a>
                    </nav>
                </div>
            </header>

            {/* Hero */}
            <section
            className="relative h-[70vh] bg-cover bg-center"
            style={{ backgroundImage: "url('/images/bg.png')" }}
            >
                {/* Overlay gelap */}
                <div className="absolute inset-0 flex items-center justify-center">
                    <h1 className="text-white text-3xl md:text-5xl font-bold text-center px-4 max-w-4xl">
                    SELAMAT DATANG DI UNIT LAYANAN TERPADU UPN VETERAN JAKARTA
                    </h1>
                </div>
            </section>

            {/* Detail Section */}
            <section className="py-16 px-6 bg-gray-50">
                <div className="max-w-4xl mx-auto">
                    

                    {/* Accordion */}
                    <div className="mt-8">
                        <AccordionItem
                            title="📍  Bagaimana cara mendapatkan layanan dari Unit Layanan Terpadu?"
                            content=" Untuk prosedur tatap muka dapat datang langsung ke ruang ULT, dan untuk
                            prosedur media terpadu dapat langsung menghubungi kontak ULT."
                        />
                        <AccordionItem
                            title="📍 Dimanakah lokasi Kantor Unit Layanan Terpadu?"
                            content="Lokasi kantor ULT berada di Gedung Rektorat Lantai Dasar UPN Veteran Jakarta. Anda dapat mengakses lokasi melalui pintu masuk utama kampus."
                        />
                        <AccordionItem
                            title="📞 Kontak Unit Layanan Terpadu"
                            content={
                                <>
                                    Email:{" "}
                                    <a
                                        href="mailto:ult@upnvj.ac.id"
                                        className="text-green-700 underline"
                                    >
                                        ult@upnvj.ac.id
                                    </a>
                                    <br />
                                    WhatsApp:{" "}
                                    <a
                                        href="https://wa.me/6281234567890"
                                        className="text-green-700 underline"
                                    >
                                        +62 812 3456 7890
                                    </a>
                                </>
                            }
                        />
                    </div>
                </div>
            </section>

            {/* Footer */}
            <footer className="bg-green-900 text-white text-center py-6 text-sm">
                <p>
                    &copy; {new Date().getFullYear()} Unit Layanan Terpadu - UPN
                    Veteran Jakarta
                </p>
            </footer>

            {/* Floating Chatbot Button */}
            <a
                href="/chatbot"
                className="fixed bottom-6 right-6 bg-green-700 hover:bg-green-800 text-white p-4 rounded-full shadow-lg transition-all duration-300 z-50"
                title="Chatbot"
            >
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M7 8h10M7 12h4m1 9a9 9 0 100-18 9 9 0 000 18z"
                    />
                </svg>
            </a>
        </div>
    );
};

export default Welcome;
