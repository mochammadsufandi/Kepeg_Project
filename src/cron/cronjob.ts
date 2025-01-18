import { PrismaClient } from "@prisma/client";
import cron from "node-cron";
import { ConverterData } from "../utils/converterFunction";
const prisma = new PrismaClient();

const cronJobForCheckingPromotion = () => {
  cron.schedule("0 10 1 2,4,6,8,10,12 *", async () => {
    const personnel = await prisma.pegawai.findMany();
    const nowDate = new Date();
    const newPromotionDate = ConverterData.promotionYADConverter(nowDate);
    personnel.forEach(async (value) => {
      const originalRank = value.originalRank?.match(/\(.*?\)/g)?.[0];
      const numericRank = value.numericRank;
      if (value.promotionYAD === nowDate) {
        await prisma.pegawai.update({
          where: {
            NIP: value.NIP,
            promotionChecking: true,
          },
          data: {
            pangkatSejak: nowDate,
            promotionYAD: newPromotionDate,
            numericRank: value.numericRank ? value.numericRank + 1 : null,
          },
        });
      }
    });
    console.log(personnel);
  });
};

export default cronJobForCheckingPromotion;
