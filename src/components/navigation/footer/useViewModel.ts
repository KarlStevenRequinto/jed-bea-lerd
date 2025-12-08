export const useFooterViewModel = () => {
    const currentYear = new Date().getFullYear();

    const legalLinks = [
        { label: "Terms of Service", href: "/terms" },
        { label: "Privacy Policy", href: "/privacy" },
        { label: "Cookie Policy", href: "/cookies" },
        { label: "Disclaimer", href: "/disclaimer" },
    ];

    const servicesLinks = [
        { label: "Buy Properties", href: "/properties/buy" },
        { label: "Rent Properties", href: "/properties/rent" },
        { label: "Buy Vehicles", href: "/vehicles/buy" },
        { label: "Sell Vehicles", href: "/vehicles/sell" },
    ];

    const companyLinks = [
        { label: "About Us", href: "/about" },
        { label: "Careers", href: "/careers" },
        { label: "Press", href: "/press" },
        { label: "Contact Us", href: "/contact" },
    ];

    return {
        currentYear,
        legalLinks,
        servicesLinks,
        companyLinks,
    };
};
