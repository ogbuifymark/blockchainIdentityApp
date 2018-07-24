using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Mvc;

namespace BlockchainIdentitySystem.TestFolder
{
    public class AuthController : Controller
    {
       
        public ActionResult Index()
        {
            Guid guid = Guid.NewGuid();
            ViewBag.version = guid.ToString();
            return View();
        }
       
        
    }
}
