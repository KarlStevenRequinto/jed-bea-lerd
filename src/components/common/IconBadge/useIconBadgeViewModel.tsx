"use client";

import { useMemo } from "react";

type UseFeatureVMArgs = {
    label: string;
};

export const useIconBadgeViewModel = ({ label }: UseFeatureVMArgs) => {
    const testId = "feature-item";
    const normalizedLabel = useMemo(() => label, [label]);
    return {
        testId,
        label: normalizedLabel,
    };
};

