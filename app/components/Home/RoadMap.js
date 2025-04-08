import SectionHeading from "../SectionHeading";
import { useTranslation } from "react-i18next";

export default function RoadMap() {
  const { t } = useTranslation();
  const phaseData = [
    {
      quarter: t("home.roadMap.phases.0.quarter"),
      title: t("home.roadMap.phases.0.title"),
      items: [
        t("home.roadMap.items.marketResearch"),
        t("home.roadMap.items.whitepaperRelease"),
        t("home.roadMap.items.tokenomicsDesign"),
      ],
    },
    {
      quarter: t("home.roadMap.phases.1.quarter"),
      title: t("home.roadMap.phases.1.title"),
      items: [
        t("home.roadMap.items.aiComputeGridTestnet"),
        t("home.roadMap.items.rwaTokenizationBeta"),
        t("home.roadMap.items.depinNodeDeployment"),
        t("home.roadMap.items.aiDaoPrototype"),

      ],
    },
    {
      quarter: t("home.roadMap.phases.2.quarter"),
      title: t("home.roadMap.phases.2.title"),
      items: [
        t("home.roadMap.items.mainnetDeployment"),
        t("home.roadMap.items.rwaMarketplace"),
        t("home.roadMap.items.aiManagedStakingPools"),
      ],
    },
    {
      quarter: t("home.roadMap.phases.3.quarter"),
      title: t("home.roadMap.phases.3.title"),
      items: [
        t("home.roadMap.items.aiModelMarketplace"),
        t("home.roadMap.items.crossChainCompatibility"),
        t("home.roadMap.items.layer2Scaling"),
      ],
    },
  ];

  return (
    <div
      id="roadmap"
      className="bg-black px-4 md:px-5 py-24 relative overflow-hidden"
    >
      <img
        src="/assets/roadmap-bg.svg"
        alt="bg-graphic"
        className="absolute bottom-0 left-0 w-full object-cover  md:block hidden"
      />
      <img
        src="/assets/roadmap-bg-mobile.png"
        alt="bg-graphic"
        className="absolute bottom-0 left-0 w-full object-cover block md:hidden"
      />
      <SectionHeading text={t("home.roadMap.subTitle")} />
      <h1 className="my-[25px] text-[32px] md:text-[40px] leading-[44px] font-bold text-white text-center">
        {t("home.roadMap.title")}
      </h1>
      <p className="text-center text-[18px] leading-[27px] font-normal font-poppins text-white/80 max-w-[653px] mx-auto">
        {t("home.roadMap.description")}
      </p>

      {/* Cards Section */}
      <div className="max-w-[1236px] mx-auto grid lg:grid-cols-4 justify-items-center sm:grid-cols-2 md:gap-[28px] gap-[16px] mt-[75px] pb-[40px]">
        {phaseData.map((phase, index) => (
          <div
            key={index}
            className="rounded-[20px] bg-[#12092503] xl:w-[300px] border border-[#FFFFFF80] overflow-hidden min-h-[126px] transition-shadow duration-300 hover:shadow-[0px_0px_25px_0px_#8B5CF6]"
          >
            <div
              className="text-white rounded-[20px] px-[20px] pt-[11px] pb-[19px] min-h-[126px] flex flex-col w-full h-full flex-1"
              style={{
                boxShadow: "0px 0px 50px 0px #8B5CF680 inset",
                backdropFilter: "blur(10px)",
              }}
            >
              <h3 className="text-[20px] mb-[12px]">{phase.quarter}</h3>
              <h2 className="text-[20px] font-bold mb-[18px]">{phase.title}</h2>
              <ul className="space-y-2">
                {phase.items.map((item, i) => (
                  <li
                    key={i}
                    className="font-poppins font-[400] flex items-center gap-2"
                  >
                    <span className="w-1 min-w-1 h-1 bg-white rounded-full me-1"></span>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
