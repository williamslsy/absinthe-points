-- CreateTable
CREATE TABLE "Projects" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "api_key" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Events" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "project_id" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Points" (
    "id" SERIAL NOT NULL,
    "event_id" INTEGER NOT NULL,
    "project_id" INTEGER NOT NULL,
    "points" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Points_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Projects_api_key_key" ON "Projects"("api_key");

-- CreateIndex
CREATE UNIQUE INDEX "Events_name_project_id_key" ON "Events"("name", "project_id");

-- CreateIndex
CREATE UNIQUE INDEX "Points_event_id_project_id_address_key" ON "Points"("event_id", "project_id", "address");

-- AddForeignKey
ALTER TABLE "Events" ADD CONSTRAINT "Events_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_event_id_fkey" FOREIGN KEY ("event_id") REFERENCES "Events"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Points" ADD CONSTRAINT "Points_project_id_fkey" FOREIGN KEY ("project_id") REFERENCES "Projects"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
