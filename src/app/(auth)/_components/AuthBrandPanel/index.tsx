"use client";

import Image from "next/image";
import Link from "next/link";
import { TeslaIconSvg, ProtectIconSvg, CountryHouseIconSvg } from "@/components/svg-icons";
import homeNDriveLogo from "@/assets/images/home-n-drive-logo.png";
import IconBadge from "@/components/common/IconBadge";

interface AuthBrandPanelProps {
    animationKey?: number;
}

const AuthBrandPanel: React.FC<AuthBrandPanelProps> = ({ animationKey }) => {
    return (
        <aside
            className="hidden lg:flex min-h-screen w-full"
            style={{
                background: "linear-gradient(90deg, var(--color-brand-light) 0%, var(--color-white) 90%)",
            }}
            aria-label="Promotional content"
        >
            <div key={animationKey} className="mx-auto w-full max-w-[720px] p-10 flex flex-col items-center justify-center gap-6">
                <div className="flex flex-col items-center mt-6 gap-1">
                    <div className="animate-fade-in-up" style={{ animationDelay: "0s" }}>
                        <Link href="/" aria-label="Go to homepage" className="inline-block">
                            <Image src={homeNDriveLogo} alt="HomeNDrive" width={200} height={80} className="object-contain" priority />
                        </Link>
                    </div>
                    <p className="text-normal text-center-flex text-[15px] animate-fade-in-up -mt-6" style={{ animationDelay: "0.1s" }}>
                        Your trusted platform for vehicles and properties.
                    </p>
                </div>

                <div className="w-full max-w-[640px] overflow-hidden animate-fade-in-up" style={{ animationDelay: "0.2s" }} aria-hidden>
                    <Image
                        src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=80"
                        alt="Property with vehicle"
                        width={1600}
                        height={1066}
                        className="h-[420px] w-full object-cover rounded-[10px]"
                        priority
                    />
                </div>

                <div className="mt-2 grid grid-cols-3 gap-8">
                    <div style={{ animationDelay: "0.1s" }}>
                        <IconBadge icon={<TeslaIconSvg />} label="Quality Vehicles" />
                    </div>
                    <div style={{ animationDelay: "0.2s" }}>
                        <IconBadge icon={<ProtectIconSvg />} label="Secure and Trusted" />
                    </div>
                    <div style={{ animationDelay: "0.3s" }}>
                        <IconBadge icon={<CountryHouseIconSvg />} label="Quality Properties" />
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default AuthBrandPanel;
