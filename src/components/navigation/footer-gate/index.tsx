"use client";

import { useFooterGateViewModel } from "./useViewModel";
import { Footer } from "../footer";

const FooterGate = () => {
    const { mounted, isAuthPage } = useFooterGateViewModel();

    if (!mounted) return null;
    if (isAuthPage) return null;

    return <Footer />;
};

export default FooterGate;
