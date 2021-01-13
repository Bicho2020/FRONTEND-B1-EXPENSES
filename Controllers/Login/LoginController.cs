using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace FondoPorRendir2.Controllers.Login
{
    public class LoginController : Controller
    {
  
        public ActionResult Ingresar()
        {
            return View();
        }
       
        public ActionResult Dashboard()
        {
            return View();
        }



    }
}
