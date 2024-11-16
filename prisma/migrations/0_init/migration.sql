-- CreateTable
CREATE TABLE "Customer" (
    "customerId" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("customerId")
);

-- CreateTable
CREATE TABLE "Order" (
    "orderId" SERIAL NOT NULL,
    "customerId" INTEGER NOT NULL,
    "dateReceived" TEXT NOT NULL,
    "datePromised" TEXT NOT NULL,
    "remarks" TEXT NOT NULL,
    "totalCharges" INTEGER NOT NULL,
    "deposit" INTEGER NOT NULL,
    "balanceDue" INTEGER NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("orderId")
);

-- CreateTable
CREATE TABLE "Payment" (
    "paymentId" SERIAL NOT NULL,
    "orderId" INTEGER NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "dateReceived" TEXT NOT NULL,

    CONSTRAINT "Payment_pkey" PRIMARY KEY ("paymentId")
);

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "Order"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

