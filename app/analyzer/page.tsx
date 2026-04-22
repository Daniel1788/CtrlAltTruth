// Licensed under the GNU AGPL-3.0-only.
'use client';

import React from 'react';
import AnalyzerView from '@/components/views/AnalyzerView';
import { TOPICS } from '@/lib/data';

export default function AnalyzerPage() {
    return (
        <div className="py-12 md:py-20">
            <AnalyzerView topics={TOPICS} />
        </div>
    );
}
