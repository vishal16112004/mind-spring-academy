import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin } from 'lucide-react';

export function MapEmbed() {
  return (
    <Card className="overflow-hidden shadow-lg">
      <CardContent className="p-0">
        <div className="aspect-video relative bg-muted flex flex-col items-center justify-center">
            <Image 
                src="https://placehold.co/600x400.png" 
                alt="Map placeholder showing tuition center location" 
                layout="fill"
                objectFit="cover"
                data-ai-hint="map location" 
            />
            <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center p-4 text-center">
                <MapPin className="w-12 h-12 text-white mb-2" />
                <p className="text-white font-semibold">Our Location</p>
                <p className="text-xs text-slate-200 mt-2">
                    A live map will be displayed here. (Requires Google Maps API Key setup)
                </p>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
