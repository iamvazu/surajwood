import React from 'react';

const HomeTechnicalComparison = () => {
  const comparisonData = [
    {
      feature: "Core Technology",
      surajWood: "PMMA Acrylic + PUR",
      petg: "PETG Plastic + Standard Glue",
      laminate: "Paper Resin",
      advantage: "Zero delamination, highest clarity"
    },
    {
      feature: "Scratch Rating",
      surajWood: "3H (Superior)",
      petg: "2H (Standard)",
      laminate: "1H - 2H",
      advantage: "Longer life in kitchens"
    },
    {
      feature: "UV Resistance",
      surajWood: "10+ Years (No Fading)",
      petg: "Moderate (May Yellow)",
      laminate: "Moderate",
      advantage: "Perfect for sunny Indian homes"
    },
    {
      feature: "Repairability",
      surajWood: "Yes (Can be buffed)",
      petg: "No",
      laminate: "No",
      advantage: "Easy maintenance for years"
    }
  ];

  return (
    <section className="bg-cream py-24 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row gap-16 items-center">
          <div className="lg:w-1/3">
            <span className="text-copper font-bold text-sm uppercase tracking-widest">Ahrefs Verified Authority</span>
            <h2 className="font-heading font-bold text-4xl text-navy mt-4 mb-6 leading-tight">
              Why Professionals Choose SurajWood Over PETG
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-8">
              Don&apos;t compromise with budget PETG boards or standard laminates. SurajWood&apos;s factory-bonded prelaminated acrylic panels offer the technical durability architects demand.
            </p>
            <div className="space-y-4">
              {["100% Moisture Proof", "German PUR Bonding", "95% Reflectivity"].map((item) => (
                <div key={item} className="flex items-center gap-3">
                  <div className="w-5 h-5 rounded-full bg-copper flex items-center justify-center text-white text-[10px]">✓</div>
                  <span className="font-semibold text-navy text-sm">{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:w-2/3 w-full">
            <div className="bg-white rounded-3xl p-1 shadow-2xl border border-gray-100 overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-navy text-white">
                      <th className="p-5 text-sm font-bold uppercase tracking-wider">Technical Feature</th>
                      <th className="p-5 text-sm font-bold uppercase tracking-wider bg-copper">SurajWood Acrylic</th>
                      <th className="p-5 text-sm font-bold uppercase tracking-wider">PETG Boards</th>
                      <th className="p-5 text-sm font-bold uppercase tracking-wider">Standard Laminates</th>
                    </tr>
                  </thead>
                  <tbody>
                    {comparisonData.map((row, i) => (
                      <tr key={i} className={i % 2 === 0 ? "bg-white" : "bg-cream/20"}>
                        <td className="p-5 font-bold text-navy border-b border-gray-100">{row.feature}</td>
                        <td className="p-5 text-navy font-bold bg-copper/5 border-b border-gray-100">
                          {row.surajWood}
                          <div className="text-[10px] text-copper mt-1 italic font-normal">{row.advantage}</div>
                        </td>
                        <td className="p-5 text-gray-500 border-b border-gray-100">{row.petg}</td>
                        <td className="p-5 text-gray-500 border-b border-gray-100">{row.laminate}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeTechnicalComparison;
