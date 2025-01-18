import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { ConverterData } from "../utils/converterFunction";
const prisma = new PrismaClient();

const cronJobForCheckingPromotion = () => {
  cron.schedule("0 10 * * *", async () => {
    const personnel = await prisma.pegawai.findMany();
    const nowDate = new Date();
    const newPromotionDate = ConverterData.promotionYADConverter(nowDate);
    personnel.forEach(async (value) => {
      if (value.promotionYAD === nowDate && value.promotionChecking) {
        const newNumericRank =
          value.numericRank !== null ? (value.numericRank !== 0 ? value.numericRank + 1 : 0) : null;
        const newOriginalRank =
          newNumericRank !== null ? ConverterData.originalRankConverter(newNumericRank) : null;

        const newPromotionChecking =
          value.pendidikanTerakhir !== null && value.numericRank !== null
            ? ConverterData.promotionCheckingConverter({
                pendidikanTerakhir: value.pendidikanTerakhir,
                numericRank: value.numericRank,
              })
            : null;
        await prisma.pegawai.update({
          where: {
            NIP: value.NIP,
            promotionChecking: true,
          },
          data: {
            pangkatSejak: nowDate,
            promotionYAD: newPromotionDate,
            numericRank: newNumericRank,
            originalRank: newOriginalRank,
            promotionChecking: newPromotionChecking,
          },
        });
      }
    });
  });
};

export default cronJobForCheckingPromotion;
