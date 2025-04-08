import SectionHeading from "../SectionHeading";
import Button from "../Button";
import { useTranslation } from "react-i18next";

export default function RewardsCalculator() {
  const { t } = useTranslation();
  const cardData = [
    {
      title: t("home.rewardsCalculator.cards.0.title"),
      apr: t("home.rewardsCalculator.cards.0.apr"),
    },
    {
      title: t("home.rewardsCalculator.cards.1.title"),
      apr: t("home.rewardsCalculator.cards.1.apr"),
    },
    {
      title: t("home.rewardsCalculator.cards.2.title"),
      apr: t("home.rewardsCalculator.cards.2.apr"),
    },
    {
      title: t("home.rewardsCalculator.cards.3.title"),
      apr: t("home.rewardsCalculator.cards.3.apr"),
    },
  ];

  return (
    <div className="  bg-black px-4 md:px-5 py-24 relative overflow-hidden">
      <img
        src="/assets/graphic.svg"
        alt="graphic" 
        className="absolute bottom-0 left-0 w-full"
      />
      <SectionHeading text={t("home.rewardsCalculator.title.end")} />
      <h1 className="px-3 my-[25px] text-[32px] md:text-[40px] leading-[44px] font-bold text-white text-center">
        {t("home.rewardsCalculator.title.start")}{" "}
        <span className="text-[#9442ED]">
          {t("home.rewardsCalculator.title.end")}
        </span>
      </h1>
      <p className="px-2 text-center text-[18px] leading-[27px] font-normal font-poppins text-white/80 max-w-[653px] mx-auto">
        {t("home.rewardsCalculator.description")}
      </p>

      {/* Cards Section */}
      <div className="max-w-[1236px] mx-auto grid md:grid-cols-4 grid-cols-2 lg:gap-[47px] gap-[20px] mt-[75px]">
        {cardData.map((card, index) => (
          <div
            key={index}
            className="rounded-[20px] bg-[#12092503] border border-white/40 overflow-hidden min-h-[126px] transition-shadow duration-300 hover:shadow-[0px_0px_25px_0px_#8B5CF6]"
          >
            <div
              className="rounded-[20px] px-[24px] py-[29px] min-h-[126px] flex flex-col items-center justify-center text-center gap-[15px] w-full h-full flex-1"
              style={{
                boxShadow: "0px 0px 50px 0px #8B5CF680 inset",
                backdropFilter: "blur(10px)",
              }}
            >
              <h2 className="text-[24px] font-bold text-white">{card.title}</h2>
              <p className="text-white font-poppins font-[400] text-[16px] whitespace-pre-line">
                {card.apr}
              </p>
            </div>
          </div>
        ))}
      </div>
      <div className="mx-auto flex w-full justify-center items-center mt-[60px] lg:pb-[154px]">
        <Button
          href="/staking"
          translationKey="home.rewardsCalculator.buttonText"
          extraClass="h-[47px]"
        />
      </div>
    </div>
  );
}
