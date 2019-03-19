using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using neighborhoodDealer.Models;

namespace neighborhoodDealer.Controllers
{
    public class HomeController : Controller
    {
        private Context dbContext;

        public HomeController(Context context)
        {
            dbContext = context;
        }

        //===========================================================================
        //USER SETTINGS AND STUFF
        //=========================================================================== 
        [HttpPost("/registration")]//REGISTRATION
        public JsonResult registration([FromBody] register newUser)
        {
            if (ModelState.IsValid)
            {
                if (dbContext.users.Any(u => u.email == newUser.email))
                {
                    Dictionary<string, string> error = new Dictionary<string, string>();
                    error.Add("Message", "Error");
                    error.Add("email", "Email is already in use");
                    return Json(error);
                }
                if (dbContext.users.Any(u => u.username == newUser.username))
                {
                    Dictionary<string, string> error = new Dictionary<string, string>();
                    error.Add("Message", "Error");
                    error.Add("username", "Username is already in use");
                    return Json(error);
                }
                PasswordHasher<register> Hasher = new PasswordHasher<register>();
                newUser.password = Hasher.HashPassword(newUser, newUser.password);
                users usertoAdd= new users{
                   username=newUser.username,
                   password=newUser.password,
                   email=newUser.email,
                };
                dbContext.users.Add(usertoAdd);
                dbContext.SaveChanges();
                users User= dbContext.users.FirstOrDefault(x=>x.email==newUser.email);
                HttpContext.Session.SetInt32("UserId", User.userId);

                Dictionary<string, string> success = new Dictionary<string, string>();
                success.Add("Message", "Success");
                return Json(success);
            }
            else
            {
                return Json(ModelState);
            }
        }

        [HttpPost("/loggingIn")]//LOGIN
        public IActionResult loginUser([FromBody] login exUser)
        {
            if (ModelState.IsValid)
            {
                var userInDb = dbContext.users.FirstOrDefault(u => u.email == exUser.email);
                Dictionary<string, string> error = new Dictionary<string, string>();
                if (userInDb == null)
                {
                    error.Add("Message", "Error");
                    error.Add("email", "Invalid email");
                    return Json(error);
                }
                var hasher = new PasswordHasher<login>();
                var result = hasher.VerifyHashedPassword(exUser, userInDb.password, exUser.password);

                if (result == 0)
                {
                    error.Add("Message", "Error");
                    error.Add("password", "Invalid password");
                    return Json(error);
                }

                HttpContext.Session.SetInt32("UserId", userInDb.userId);
                Dictionary<string, string> success = new Dictionary<string, string>();
                success.Add("Message", "Success");
                return Json(success);
            }
            else
            {
                return Json(ModelState);
            }
        }
        
        [HttpGet("/checkLogin")]
        public IActionResult checkLogin(){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            else{
                int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);
                users addUser = dbContext.users.FirstOrDefault(u=>u.userId == userId);
                return Json(addUser);
            }
        }

        [HttpGet("/logout")]
        public IActionResult logout(){
            HttpContext.Session.Clear();
            Dictionary<string, string> success = new Dictionary<string, string>();
            success.Add("Message", "Success");
            return Json(success);
        }


        //===========================================================================
        //Products
        //=========================================================================== 
        [HttpPost("/postProduct")]
        public IActionResult postProduct([FromBody] products newProduct){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            if (ModelState.IsValid)
            {
                int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);
                users addUser = dbContext.users.FirstOrDefault(u=>u.userId == userId);

                newProduct.userId = userId;
                newProduct.user = addUser;
                dbContext.products.Add(newProduct);
                dbContext.SaveChanges();

                Dictionary<string, string> success = new Dictionary<string, string>();
                success.Add("Message", "Success");
                return Json(success);
            }
            else
            {
                return Json(ModelState);
            }
        }

        [HttpGet("/removeProduct/{id}")]
        public IActionResult removeProduct(int id){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }

            int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);        
            if(dbContext.products.Any(p=>p.productId == id && p.userId == userId)){
                products prodRemove = dbContext.products.FirstOrDefault(p=>p.productId == id);
                dbContext.products.Remove(prodRemove);
                dbContext.SaveChanges();

                Dictionary<string, string> success = new Dictionary<string, string>();
                success.Add("Message", "Success");
                return Json(success);
            }
            else{
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }

        }

        [HttpGet("/showProducts")]
        public IActionResult showProducts(){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            List<products> allProducts = dbContext.products.OrderByDescending(m=>m.createdAt).Include(u=>u.user).ToList();
            return Json(allProducts);
        }

        [HttpGet("/getUserProducts")]
        public IActionResult getUserProducts(){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
             int userId = HttpContext.Session.GetInt32("UserId") ?? default(int); 
             List<products> userProducts = dbContext.products.OrderByDescending(c=>c.createdAt).Where(p=>p.userId == userId).Include(u=>u.user).ToList();
             return Json(userProducts);
        }

        [HttpGet("/getOneProduct/{id}")]
        public IActionResult getOneProduct(int id){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
             products oneProduct = dbContext.products.Where(p=>p.productId == id).Include(u=>u.user).FirstOrDefault();
             return Json(oneProduct);
        }

        [HttpPost("/newMessage/{id}/{productId}")]
        public IActionResult newMessage(int id, int productId, [FromBody] messages newMessage){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            if(ModelState.IsValid){
                if(dbContext.users.Any(u=> u.userId == id)){
                    if(dbContext.products.Any(p=> p.productId == productId)){
                        int userId = HttpContext.Session.GetInt32("UserId") ?? default(int); 
                        users recUser = dbContext.users.Where(u=>u.userId == id).FirstOrDefault();
                        users sentUser = dbContext.users.Where(u=>u.userId == userId).FirstOrDefault();
                        products prodMes = dbContext.products.Where(p=>p.productId == productId).FirstOrDefault();

                        offers newOffer = new offers{
                            productId = productId,
                            product = prodMes,
                            userOneId = userId,
                            userTwoId = id,
                        };
                        newOffer.userOne = sentUser;
                        newOffer.userTwo = recUser;

                        dbContext.offers.Add(newOffer);
                        dbContext.SaveChanges();

                        newMessage.userId = userId;
                        newMessage.offerId = newOffer.offerId;
                        newMessage.offer = newOffer;
                        dbContext.messages.Add(newMessage);
                        dbContext.SaveChanges();
                        Dictionary<string, string> success = new Dictionary<string, string>();
                        success.Add("Message", "Success");
                        return Json(success);
                    }else{
                        Dictionary<string, string> error = new Dictionary<string, string>();
                        error.Add("Message", "Error");
                        return Json(error);
                    }
                }else{
                    Dictionary<string, string> error = new Dictionary<string, string>();
                    error.Add("Message", "Error");
                    return Json(error);
                }
            }else{
                return Json(ModelState);
            }
        }

        [HttpPost("/sendMessage/{id}")]
        public IActionResult sendMessage(int id, [FromBody] messages newMessage){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            if(ModelState.IsValid){
                if(dbContext.offers.Any(o=>o.offerId == id)){
                    offers offer = dbContext.offers.Where(o=>o.offerId == id).FirstOrDefault();
                    int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);
                    newMessage.userId = userId;
                    newMessage.offerId = id;
                    newMessage.offer = offer;
                    dbContext.messages.Add(newMessage);
                    dbContext.SaveChanges();
                    Dictionary<string, string> success = new Dictionary<string, string>();
                    success.Add("Message", "Success");
                    return Json(success);
                }else{
                    Dictionary<string, string> error = new Dictionary<string, string>();
                    error.Add("Message", "Error");
                    return Json(error);
                }
            }else{
                return Json(ModelState);
            }
        }

        [HttpGet("/userMessages")]
        public IActionResult userMessages(){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);
            List<offers> uOffers = dbContext.offers.OrderByDescending(t=>t.createdAt).Where(o=>o.userOneId == userId || o.userTwoId == userId).Include(u=>u.userOne).Include(ut=>ut.userTwo).Include(p=>p.product).ToList();
            return Json(uOffers);
        }

        [HttpGet("/getMessages/{id}")]
        public IActionResult getMessages(int id){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            int userId = HttpContext.Session.GetInt32("UserId") ?? default(int);
            offers offerMes = dbContext.offers.Where(o=>o.offerId == id).Include(u=>u.userOne).Include(ut=>ut.userTwo).Include(p=>p.product).Include(m=>m.messages).FirstOrDefault();
            return Json(offerMes);
        }

        [HttpGet("searchProduct/{search}")]
        public IActionResult searchProduct(string search){
            if(HttpContext.Session.GetInt32("UserId") == null)
            {
                Dictionary<string, string> error = new Dictionary<string, string>();
                error.Add("Message", "Error");
                return Json(error);
            }
            List<products> searchProducts = dbContext.products.OrderByDescending(m=>m.createdAt).Where(p=>p.title.Contains(search) || p.desc.Contains(search)).Include(u=>u.user).ToList();
            return Json(searchProducts);
        }

    }
}
