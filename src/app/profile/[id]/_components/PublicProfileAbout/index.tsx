import { ProfileData, ProfileStats } from "@/lib/types/profile";
import { usePublicProfileAboutViewModel } from "./useViewModel";

interface PublicProfileAboutProps {
    profile: ProfileData;
    stats: ProfileStats;
}

const PublicProfileAbout = ({ profile, stats }: PublicProfileAboutProps) => {
    const { heading, infoRows, trustRows } = usePublicProfileAboutViewModel(profile, stats);

    return (
        <section className="grid gap-6 xl:grid-cols-[1.35fr_0.95fr]">
            <div className="rounded-[24px] border border-[var(--color-gray-200)] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.05)]">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">
                        {heading}
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                        Clear context helps buyers decide faster and trust sooner.
                    </p>
                </div>

                <div className="grid gap-4 sm:grid-cols-2">
                    {infoRows.map((row) => (
                        <div
                            key={row.label}
                            className="rounded-2xl border border-[var(--color-gray-200)] bg-[var(--color-gray-50)]/70 p-4"
                        >
                            <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--color-gray-400)]">
                                {row.label}
                            </p>
                            <p className="mt-2 text-sm leading-6 text-[var(--color-gray-800)]">
                                {row.value}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="rounded-[24px] border border-[var(--color-green-100)] bg-[linear-gradient(180deg,rgba(243,250,244,0.95),rgba(255,255,255,1))] p-6 shadow-[0_18px_42px_rgba(39,102,58,0.08)]">
                <div className="mb-5">
                    <h2 className="text-lg font-semibold text-[var(--color-gray-900)]">
                        Trust signals
                    </h2>
                    <p className="mt-1 text-sm text-[var(--color-gray-500)]">
                        The strongest profile pages reduce uncertainty before a first message.
                    </p>
                </div>

                <div className="space-y-3">
                    {trustRows.map((row) => (
                        <div
                            key={row.label}
                            className="flex items-start gap-3 rounded-2xl border border-white/70 bg-white/80 px-4 py-3"
                        >
                            <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[rgba(103,188,120,0.14)] text-[var(--color-brand-dark)]">
                                <CheckIcon />
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-[var(--color-gray-900)]">
                                    {row.label}
                                </p>
                                <p className="mt-0.5 text-sm leading-5 text-[var(--color-gray-600)]">
                                    {row.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

const CheckIcon = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
            d="M20 7L10 17L5 12"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

export default PublicProfileAbout;
