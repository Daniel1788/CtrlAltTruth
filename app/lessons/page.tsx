// Licensed under the GNU AGPL-3.0-only.
'use client';

import React, { useState } from 'react';
import LessonsView from '@/components/views/LessonsView';
import { LESSONS } from '@/lib/data';

export default function LessonsPage() {
  const [activeLesson, setActiveLesson] = useState<number | null>(null);

  return (
    <div className="py-12 md:py-20">
      <LessonsView 
        lessons={LESSONS} 
        activeLesson={activeLesson} 
        setActiveLesson={setActiveLesson} 
      />
    </div>
  );
}
