import Image from "next/image";

export default function LogoTestPage() {
  const logos = [
    "/images/logo/suraj-logo.png",
    "/images/logo/suraj-logo-white.png",
    "/images/logo/logo-suraj.png",
    "/images/logo/logo-suraj-white.png",
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-black">Logo Test Page</h1>
      <div className="grid grid-cols-2 gap-8">
        {logos.map((src) => (
          <div key={src} className="p-6 bg-white rounded-xl shadow-md space-y-4">
            <p className="text-sm font-semibold text-gray-500">{src}</p>
            <div className="relative h-20 w-48 border border-gray-200 bg-gray-50">
              <Image src={src} alt="logo" fill className="object-contain" />
            </div>
            <div className="relative h-20 w-48 border border-gray-200 bg-black">
              <Image src={src} alt="logo" fill className="object-contain" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
