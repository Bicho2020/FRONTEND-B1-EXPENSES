using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FondoPorRendir2.Controllers.Master
{
    public class MasterController : Controller
    {
        public IActionResult Home()
        {
            return View();
        }

        public IActionResult Sociedad()
        {
            return View();
        }

        public IActionResult Roles()
        {
            return View();
        }

        public IActionResult Usuario()
        {
            return View();
        }

         public IActionResult Licencia()
        {
             return View();
        }

        public IActionResult UsuarioSap()
        {
            return View();

        }
        public IActionResult Logo()
        {
                return View();
        }
        public IActionResult AsignacionJefe()
        {
            return View();
        }

        public IActionResult Perfil()
        {
            return View();
        }

    }
}
