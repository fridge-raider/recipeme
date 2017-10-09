const week = 7*24*60*60*1000; 
const id = 1; 

const order_histories = [
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "alcohol"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "agave"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "alfredo sauce"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "all purpose flour"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "almond"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "anchovies"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "barbecue sauce"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - week, createdAt: Date.now() - week, userId: id, ingredientName: "bean curd"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "beef roast"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "bell pepper"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "bordelaise sauce"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "bran flakes"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "cane sugar"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "canned corn"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "cashew milk"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 2*week, createdAt: Date.now() - 2*week, userId: id, ingredientName: "chana dal"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chicken breast"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chicken broth"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chicken fillets"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chicken egg"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chicken pieces"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chili powder"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "chipped beef"}, 
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "ciabatta"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 3*week, createdAt: Date.now() - 3*week, userId: id, ingredientName: "cider vinegar"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "cinnamon toast crunch cereal"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "clementine"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "coconut"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "corn bread"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "corn tortillas"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "cottage cheese"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 4*week, createdAt: Date.now() - 4*week, userId: id, ingredientName: "crabmeat"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "cracker"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "crayfish"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "cream of celery soup"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "crescent"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "crostini"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "cuban"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 5*week, createdAt: Date.now() - 5*week, userId: id, ingredientName: "cucumber salad"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 6*week, createdAt: Date.now() - 6*week, userId: id, ingredientName: "date sugar"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 6*week, createdAt: Date.now() - 6*week, userId: id, ingredientName: "deli meat"},
	{servings: 1, price: 3.35, week: new Date(Date.now()).getTime() - 6*week, createdAt: Date.now() - 6*week, userId: id, ingredientName: "dessert wine"}
]

module.exports = order_histories; 