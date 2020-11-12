const ProductSchema = new Schema({ 
    name: {
      type: String,
      trim: true,
      required: "Product Name"
    },

    color: {
      type: String,
    },

    price: {
      type: integer,
      required: "Price (USD)"
    },

    bloomSeason: {
      type: string
    },

    sun:{
      type: boolean
    },

    drainedSoil:{
        type: boolean
    },

    inStock:{
      type: boolean
    },

    sale:{
      type: boolean
    },

})


export default mongoose.model('Product', ProductSchema);