-- CreateTable
CREATE TABLE "User" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "email" TEXT NOT NULL,
    "email_verified" BOOLEAN NOT NULL DEFAULT false,
    "password" TEXT NOT NULL,
    "first_name" TEXT,
    "last_name" TEXT,
    "premium" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Config" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "tiktokUsername" TEXT,
    "giftWidget" JSONB NOT NULL DEFAULT '{"name_color":"white","count_color":"yellow","icon_height":"50px","author_color":"#0ae5ec","sent_sentence":"sent","alert_img_src":"https://api.services.streamshape.net/static/default_alert.gif","alert_duration":"4000","alert_sound":"https://www.mboxdrive.com/sound.mp3","alert_img_height":"100px"}',
    "followWidget" JSONB NOT NULL DEFAULT '{"author_color":"#0ae5ec","alert_img_src":"https://api.services.streamshape.net/static/default_alert.gif","alert_duration":"4000","alert_sound":"https://www.mboxdrive.com/sound.mp3","alert_img_height":"100px","sent_sentence_color":"white","sent_sentence":"has followed on TikTok!"}',
    "subscribeWidget" JSONB NOT NULL DEFAULT '{"author_color":"#0ae5ec","alert_img_src":"https://api.services.streamshape.net/static/default_alert.gif","alert_duration":"4000","alert_sound":"https://www.mboxdrive.com/sound.mp3","alert_img_height":"100px","sent_sentence_color":"white","sent_sentence":"has subscribed on TikTok!"}',
    "likeWidget" JSONB NOT NULL DEFAULT '{"author_color":"#0ae5ec","alert_img_src":"https://api.services.streamshape.net/static/hearts.gif","alert_duration":"3000","alert_img_height":"100px"}',
    "chatWidget" JSONB NOT NULL DEFAULT '{"delay":"0"}',
    "goalWidget" JSONB NOT NULL DEFAULT '{"gift":{"sentence":"TikTokGIFTGoal","target_value":500,"current_value":0,"emote_img_src":"https://image.similarpng.com/very-thumbnail/2020/07/Love-icons-social-media-vector-PNG.png","emote_img_height":"56px","text_color":"#fe365c","gradient_start":"blue","gradient_end":"#fe365c"},"like":{"sentence":"TikTokLIKEGoal","target_value":500,"current_value":0,"emote_img_src":"https://image.similarpng.com/very-thumbnail/2020/07/Love-icons-social-media-vector-PNG.png","primary_color":"blue","sentence_color":"#fe365c","emote_img_height":"56px","text_color":"#fe365c","gradient_start":"blue","gradient_end":"#fe365c"},"follow":{"sentence":"TikTokFollowGoal","target_value":5000,"current_value":0,"emote_img_src":"https://image.similarpng.com/very-thumbnail/2020/07/Love-icons-social-media-vector-PNG.png","primary_color":"blue","sentence_color":"#fe365c","emote_img_height":"0","text_color":"#fe365c","gradient_start":"blue","gradient_end":"#fe365c"},"subscribe":{"sentence":"TikTokSUBSCRIBEGoal","target_value":5000,"current_value":0,"emote_img_src":"https://image.similarpng.com/very-thumbnail/2020/07/Love-icons-social-media-vector-PNG.png","primary_color":"blue","sentence_color":"#fe365c","emote_img_height":"56px","text_color":"#fe365c","gradient_start":"blue","gradient_end":"#fe365c"}}',
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Config_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Config_userId_key" ON "Config"("userId");

-- AddForeignKey
ALTER TABLE "Config" ADD CONSTRAINT "Config_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
