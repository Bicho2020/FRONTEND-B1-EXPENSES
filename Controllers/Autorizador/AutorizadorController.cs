﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

namespace FondoPorRendir2.Controllers.Autorizador
{
    public class AutorizadorController : Controller
    {
        public IActionResult Home()
        {
            return View();
        }

        public IActionResult SolicitudFondo()
        {
            return View();
        }

        public IActionResult SolicitudRendicion()
        {
            return View();
        }

        public IActionResult MisFondos()
        {
            return View();

        }

        public IActionResult MisRendiciones()
        {
            return View();
        }

        public IActionResult Aprobaciones()
        {
            return View();
        }

        public IActionResult AprobacionesRendicion()
        {
            return View();
        }

        public IActionResult AprobacionJefe()
        {
            return View();
        }

        public IActionResult AprobacionJefeRendicion()
        {
            return View();
        }

        public IActionResult Perfil()
        {
            return View();
        }
         public IActionResult Historial()
        {
            return View();
        }

    }
}
