import mongoose from "mongoose"

export async function connectDb() {
  try {
    mongoose.connect(process.env.MONGO_DB_URI!)
    const connection = mongoose.connection

    connection.on("connected", () => {
      console.log(`mongodb connected`)
    })

    connection.on("error", (error) => {
      console.log(`Error while connecting to mongodb : ${error}`)
      process.exit()
    })
  } catch (error) {
    console.log(error)
  }
}
