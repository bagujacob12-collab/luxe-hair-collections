// ========================================
// LUXE HAIR COLLECTIONS
// PRODUCT DATA
// ========================================

const products = [
    {
        id: 1,
        name: "HD Body Wave Lace",
        category: "Closure",
        price: 185000,
        image: "assets/images/products/2x6 HD Body Wave Lace Closure .jfif",
        texture: "Body Wave",
        description: "4x4 HD Body Wave Lace Closure, 100% Virgin Human Hair, Natural Color, Pre-Plucked Hairline, Soft and Silky Texture, Easy to Install and Style, Perfect for a Natural Look.",
        lengths: [14, 16, 18, 20],
        inStock: true,
        badge: "Sale",
        featured: false
    },

    {
        id: 2,
        name: "Deep Curly Human Hair Bundles",
        category: "Bundle",
        price: 95000,
        image: "assets/images/products/Deep Curly Human Hair Bundles Natural Color .jfif",
        texture: "Curly",
        description: "Deep curly human hair bundles, 100% virgin hair, natural color, soft and silky texture, easy to style and maintain, perfect for a voluminous and glamorous look.", 
        lengths: [12, 14, 16],
        inStock: true,
        badge: "",
        featured: false
    },

    {
        id: 3,
        name: "colored straight wig",
        category: "Wigs",
        price: 195000,
        image: "assets/images/products/colored straight wig.jfif",
        texture: "Straight",
        description: "Ready to wear 13x4 lace front wig with a natural hairline and pre plucked baby hairs. Lightweight, comfortable and fits most head sizes.",
        lengths: [16, 18, 20, 22],
        inStock: true,
        badge: "New",
        featured: false
    },
        { 
        id: 4, name: "Pre Plucked Straight Lace Frontal", category: "Frontals", texture: "Straight",
        price: 170000, lengths: [12, 14, 16, 18, 20, 22],
        image: "assets/images/products/Pre Plucked Straight Lace Frontal.jfif",
        description: "Natural pre plucked hairline with soft baby hairs and a clean centre part. Melts into the skin for a flawless finish.",
        inStock: true, badge: "", featured: false
        },

        

        { 
        id: 5, name: "Pixie Cut Lace Front Wig", category: "Wigs", texture: "Straight",
        price: 75000, lengths: [10, 12],
        image: "assets/images/products/6inch Pixie Cut Wigs Human Hair .jfif",
        description: "Chic short pixie cut with a natural lace hairline. Lightweight, easy to wear and ready to go straight out of the box.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 6, name: "Burgundy Bone Straight Lace Wig", category: "Wigs", texture: "Straight",
        price: 185000, lengths: [24, 26, 28, 30],
        image: "assets/images/products/Bone Straight Human Hair Wigs 99J Burgundy Color.jfif",
        description: "Rich burgundy colour on silky bone straight hair, with an adjustable strap for a secure fit. Smooth, glossy and very long.",
        inStock: true, badge: "", featured: true
        },
        { 
        id: 7, name: "Black Body Wave Lace Wig", category: "Wigs", texture: "Body Wave",
        price: 150000, lengths: [16, 18, 20, 22],
        image: "assets/images/products/Bouncy curls 5by5 300g .jfif",
        description: "Soft, bouncy body waves with a natural centre part. Full and glossy with a pre plucked lace hairline.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 8, name: "99J Burgundy Super Long Straight Wig", category: "Wigs", texture: "Straight",
        price: 240000, lengths: [30, 32, 34],
        image: "assets/images/products/Burgundy Straight Lace Front Wig.jfif",
        description: "Show stopping extra long straight hair in deep 99J burgundy. Thick from root to tip with a flawless lace front.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 9, name: "Black Bouncy Curl Lace Wig", category: "Wigs", texture: "Deep Wave",
        price: 165000, lengths: [18, 20, 22, 24],
        image: "assets/images/products/Black Bouncy Curl Lace Wig.jfif",
        description: "Full, bouncy spiral curls that hold their shape all day. Voluminous, glamorous and easy to maintain.",
        inStock: true, badge: "Sale", featured: false
        },
        { 
        id: 10, name: "Burgundy Body Wave Wig with Blonde Highlights", category: "Wigs", texture: "Body Wave",
        price: 210000, lengths: [22, 24, 26, 28],
        image: "assets/images/products/Burgundy Body Wave Wig with Blonde Highlights.jfif",
        description: "Bold burgundy waves framed with blonde face highlights. A statement colour for people who love to stand out.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 11, name: "Crimped Deep Wave Bundles", category: "Bundles", texture: "Deep Wave",
        price: 55000, lengths: [14, 16, 18, 20, 22, 24],
        image: "assets/images/products/Crimped Deep Wave Bundles.jpg",
        description: "Thick, defined deep wave curls that blend beautifully with your natural hair. Soft, full and long lasting.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 12, name: "Side Part Body Wave Wig", category: "Wigs", texture: "Body Wave",
        price: 140000, lengths: [16, 18, 20],
        image: "assets/images/products/Side Part Body Wave Wig.jfif",
        description: "Glam layered waves styled with a deep side part. Shoulder length volume with a natural, undetectable lace line.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 13, name: "HD Lace Body Wave Wig", category: "Wigs", texture: "Body Wave",
        price: 175000, lengths: [18, 20, 22, 24],
        image: "assets/images/products/HD Lace Body Wave Wig.jfif",
        description: "Smooth, shiny wave pattern on a thin HD lace that melts into your skin. Looks like hair growing from your scalp.",
        inStock: true, badge: "Sale", featured: false
        },
        { 
        id: 14, name: "Blended Body Wave Lace Wig", category: "Wigs", texture: "Body Wave",
        price: 120000, lengths: [24, 26, 28],
        image: "assets/images/products/Blended Body Wave Lace Wig.jfif",
        description: "Long, flowing body waves at a friendly price. Full volume, soft texture and easy to style.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 15, name: "Honey Blonde 27 Body Wave Wig", category: "Wigs", texture: "Body Wave",
        price: 230000, lengths: [24, 26, 28, 30],
        image: "assets/images/products/Honey Blonde 27 Body Wave Wig.jfif",
        description: "Warm honey blonde with dreamy deep waves from root to tip. Pre plucked, pre bleached knots and ready to wear.",
        inStock: true, badge: "Sale", featured: false
        },
        { 
        id: 16, name: "Extra Long Body Wave Lace Wig", category: "Wigs", texture: "Body Wave",
        price: 280000, lengths: [30, 32, 34, 36],
        image: "assets/images/products/Extra Long Body Wave Lace Wig.jfif",
        description: "Dramatic hip length waves with heavy density. Rich black colour and a natural centre part.",
        inStock: false, badge: "", featured: false
        },
        { 
        id: 17, name: "Loose Deep Wave Lace Wig", category: "Wigs", texture: "Deep Wave",
        price: 160000, lengths: [18, 20, 22, 24],
        image: "assets/images/products/Loose Deep Wave Lace Wig.jfif",
        description: "Big, bouncy deep waves with lots of body and shine. A full glam look straight from the box.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 18, name: "4x4 Body Wave Lace Closure", category: "Closures", texture: "Body Wave",
        price: 98000, lengths: [10, 12, 14, 16, 18, 20],
        image: "assets/images/products/4x4 Body Wave Lace Closure.jfif",
        description: "Soft 4x4 lace closure with a natural part space. Matches our body wave bundles for a seamless sew in.",
        inStock: true, badge: "", featured: true
        },
        { 
        id: 19, name: "8-16 Inch Transparent Lace Frontal", category: "Frontals", texture: "Body Wave",
        price: 168000, lengths: [12, 14, 16, 18, 20],
        image: "assets/images/products/8-16 Inch Transparent Lace Frontal.jfif",
        description: "Ear to ear 8-16 transparent frontal with a natural pre plucked hairline. Part it any way you like.",
        inStock: true, badge: "New", featured: true
        },
        { 
        id: 20, name: "13x6 Lace Frontal Body Wave Wig", category: "Wigs", texture: "Body Wave",
        price: 250000, lengths: [22, 24, 26, 28, 30],
        image: "assets/images/products/13x6 Lace Frontal Body Wave Wig.jfif",
        description: "Extra wide 13x6 lace for deep parting and a natural hairline. Thick, glossy waves with serious volume.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 21, name: "Kinky Curly Lace Wig", category: "Wigs", texture: "Curly",
        price: 155000, lengths: [14, 16, 18, 20, 22],
        image: "assets/images/products/Kinky Curly Lace Wig.jfif",
        description: "Full, springy kinky curls that look and feel natural. Soft, defined and bursting with volume.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 22, name: "Bone Straight Lace Wig", category: "Wigs", texture: "Straight",
        price: 95000, lengths: [26, 28, 30, 32],
        image: "assets/images/products/Bone Straight Lace Wig.jfif",
        description: "Sleek, bone straight hair with thick density from top to bottom. Silky, tangle free and easy to restyle.",
        inStock: false, badge: "Sale", featured: false
        },
        { 
        id: 23, name: "Body Wave Wig with Side Swoop", category: "Wigs", texture: "Body Wave",
        price: 170000, lengths: [18, 20, 22, 24],
        image: "assets/images/products/Body Wave Wig with Side Swoop.jfif",
        description: "Soft body waves with a styled side swoop fringe. Glamorous, ready to wear and super natural looking.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 24, name: "Luxe Wavy Bundles", category: "Bundles", texture: "Body Wave",
        price: 165000, lengths: [14, 16, 18, 20, 22, 24, 26],
        image: "assets/images/products/Luxe Wavy Bundles.jpg",
        description: "Luxury wavy bundles in natural black. Thick from end to end, soft to the touch and made to last.",
        inStock: true, badge: "", featured: false
        },

        

        { 
        id: 25, name: "Water Wave Bundles", category: "Bundles", texture: "Deep Wave",
        price: 120000, lengths: [12, 14, 16, 18, 20, 22, 24],
        image: "assets/images/products/Water Wave Bundles.jfif",
        description: "Natural wet and wavy curls that stay defined and bouncy. Soft, full and perfect for a fresh, glam look.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 26, name: "13x4 Body Wave Lace Frontal", category: "Frontals", texture: "Body Wave",
        price: 62000, lengths: [12, 14, 16, 18, 20, 22],
        image: "assets/images/products/13x4 Body Wave Lace Frontal.jfif",
        description: "Ear to ear 13x4 frontal with a thin, natural looking lace. Soft waves with a clean, pre plucked hairline.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 27, name: "Transparent Lace Frontal, Body Wave", category: "Frontals", texture: "Body Wave",
        price: 168000, lengths: [12, 14, 16, 18, 20],
        image: "assets/images/products/Transparent Lace Frontal, Body Wave.jfif",
        description: "Lightweight transparent lace that blends into most skin tones. Rich black waves with plenty of density.",
        inStock: true, badge: "Sale", featured: false
        },
        { 
        id: 28, name: "Highlight Kinky Curly Bundles", category: "Bundles", texture: "Curly",
        price: 124000, lengths: [12, 14, 16, 18, 20, 22],
        image: "assets/images/products/Highlight Kinky Curly Bundles.jfif",
        description: "Dark brown kinky curls with warm honey highlights. Springy, full of life and ready to wear without any dye.",
        inStock: true, badge: "New", featured: true
        },
        { 
        id: 29, name: "Honey Blonde Ombre Body Wave Bundles", category: "Bundles", texture: "Body Wave",
        price: 208000, lengths: [14, 16, 18, 20, 22, 24, 26],
        image: "assets/images/products/Honey Blonde Ombre Body Wave Bundles.jfif",
        description: "Black roots melting into golden honey blonde waves. A bright, ready coloured look with no bleaching needed.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 30, name: "Caramel Highlight Straight Lace Wig", category: "Wigs", texture: "Straight",
        price: 85000, lengths: [24, 26, 28, 30],
        image: "assets/images/products/Caramel Highlight Straight Lace Wig.jfif",
        description: "Glossy dark brown hair with caramel highlights from root to tip. Silky straight with a natural, undetectable lace front.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 31, name: "Natural Black Straight Bundles", category: "Bundles", texture: "Straight",
        price: 95000, lengths: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
        image: "assets/images/products/Natural Black Straight Bundles.jfif",
        description: "Silky, smooth straight hair with a natural shine. Soft, tangle free and easy to colour, curl or style.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 32, name: "Body Wave Lace Closure", category: "Closures", texture: "Body Wave",
        price: 142000, lengths: [10, 12, 14, 16, 18, 20],
        image: "assets/images/products/Body Wave Lace Closure.jfif",
        description: "Soft lace closure with a natural part. Matches our body wave bundles for a smooth, seamless sew in.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 33, name: "Brown Ombre Body Wave Bundles", category: "Bundles", texture: "Body Wave",
        price: 162000, lengths: [14, 16, 18, 20, 22, 24],
        image: "assets/images/products/Brown Ombre Body Wave Bundles.jfif",
        description: "Natural black roots fading into rich chocolate brown. A soft, blended colour with full, shiny waves.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 34, name: "99J Burgundy Body Wave Bundles", category: "Bundles", texture: "Body Wave",
        price: 120000, lengths: [14, 16, 18, 20, 22, 24, 26],
        image: "assets/images/products/99J Burgundy Body Wave Bundles.jfif",
        description: "Deep 99J burgundy with a rich red wine tone. Smooth, bouncy waves and full ends, no dye needed.",
        inStock: false, badge: "New", featured: false
        },
        { 
        id: 35, name: "Natural Black Body Wave Bundles", category: "Bundles", texture: "Body Wave",
        price: 148000, lengths: [10, 12, 14, 16, 18, 20, 22, 24, 26, 28, 30],
        image: "assets/images/products/Natural Black Body Wave Bundles.jfif",
        description: "Our best selling body wave. Thick, shiny and soft with a natural black colour that lasts for months.",
        inStock: true, badge: "Sale", featured: false
        },
        { 
        id: 36, name: "Highlight Body Wave Bundles", category: "Bundles", texture: "Body Wave",
        price: 163000, lengths: [14, 16, 18, 20, 22, 24],
        image: "assets/images/products/Highlight Body Wave Bundles.jfif",
        description: "Chocolate brown waves with warm caramel highlights. A ready made look that adds depth and shine.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 37, name: "Straight Lace Closure", category: "Closures", texture: "Straight",
        price: 570000, lengths: [10, 12, 14, 16, 18, 20],
        image: "assets/images/products/Straight Lace Closure.jfif",
        description: "Silky straight closure on a soft, breathable lace. Lightweight, natural looking and easy to customise.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 38, name: "5x5 Straight Lace Closure", category: "Closures", texture: "Straight",
        price: 200000, lengths: [12, 14, 16, 18, 20],
        image: "assets/images/products/5x5 Straight Lace Closure.jfif",
        description: "Wide 5x5 lace for more parting freedom. Thick, silky hair with a natural scalp look.",
        inStock: true, badge: "New", featured: false
        },
        { 
        id: 39, name: "Body Wave Closure and Frontal Set", category: "Frontals", texture: "Body Wave",
        price: 95000, lengths: [14, 16, 18, 20, 22],
        image: "assets/images/products/Body Wave Closure and Frontal Set.jfif",
        description: "A matching 4x4 closure and 13x4 frontal in soft body wave. Choose the coverage you need from one set.",
        inStock: true, badge: "", featured: false
        },
        { 
        id: 40, name: "Highlight Body Wave frontal", category: "Frontal", texture: "Body Wave",
        price: 150000, lengths: [10, 12, 14, 16, 18],
        image: "assets/images/products/Highlight Body Wave frontal.jfif",
        description: "Black hair with warm honey highlights on a neat lace closure. Pre coloured so it blends with highlighted bundles.",
        inStock: true, badge: "", featured: false
        },



];
