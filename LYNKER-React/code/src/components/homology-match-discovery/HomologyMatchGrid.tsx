
'use client';

import HomologyMatchCard from './HomologyMatchCard';
import type { HomologyMatchModel } from '@/data/homology_match';

interface HomologyMatchGridProps {
  matches: HomologyMatchModel[];
}

export default function HomologyMatchGrid({ matches }: HomologyMatchGridProps) {
  return (
    <div className="space-y-4">
      {matches.map((match) => (
        <HomologyMatchCard key={match.matchId} match={match} />
      ))}
    </div>
  );
}
