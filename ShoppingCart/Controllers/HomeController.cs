
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

public class HomeController : Controller
{
    public IActionResult Index()
    {
        string jsonPath = Path.Combine(Directory.GetCurrentDirectory(), "Data", "sample_items.json");

        if (System.IO.File.Exists(jsonPath))
        {
            string jsonData = System.IO.File.ReadAllText(jsonPath);
            var jsonObject = JsonConvert.DeserializeObject<Dictionary<string, List<Product>>>(jsonData);

            if (jsonObject.TryGetValue("products", out List<Product> products))
            {
                return View(products);
            }
        }

        return View(new List<Product>());
    }

    public IActionResult CheckoutResult(string cartItems, string cartTotal)
{
    // Convert the string value of cartTotal to a double
    double.TryParse(cartTotal, out double total);

    // Format the total to always have two decimal places
    string formattedTotal = total.ToString("F2");

    // Deserialize the cartItems JSON string
    List<string> cartItemsList = new List<string>();
    
    if (!string.IsNullOrEmpty(cartItems))
    {
        cartItemsList = JsonConvert.DeserializeObject<List<string>>(cartItems);
    }

    // Pass data to the view
    ViewData["CartItems"] = cartItemsList;
    ViewData["CartTotal"] = formattedTotal; // Use the formatted total

    return View();
}

}
