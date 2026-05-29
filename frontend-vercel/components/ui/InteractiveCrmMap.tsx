'use client';

import React, { useEffect, useState } from 'react';
// import { collection, onSnapshot } from 'firebase/firestore';
// import { db } from '@/lib/config/firebase'; // Stub for later

export default function InteractiveCrmMap() {
  const [markers, setMarkers] = useState<any[]>([]);

  useEffect(() => {
    // Stub for Firestore onSnapshot listener
    // const unsub = onSnapshot(collection(db, 'properties'), (snapshot) => {
    //   setMarkers(snapshot.docs.map(d => d.data()));
    // });
    // return () => unsub();
  }, []);

  return (
    <div className="relative w-full h-[400px] bg-slate-200 rounded-xl overflow-hidden shadow-inner">
      <div className="absolute inset-0 flex items-center justify-center text-branding-navy font-semibold">
        Interactive CRM Map (Geospatial Mapping Stub)
        {markers.length > 0 && <span> - {markers.length} pins loaded</span>}
      </div>
    </div>
  );
}
