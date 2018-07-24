using BlockchainIdentitySystem.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace BlockchainIdentitySystem.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Title = "Home Page";
            Guid guid = Guid.NewGuid();
            ViewBag.version = guid.ToString();
            return View();
        }
        [HttpGet]
        public ActionResult GetJsonData()
        {
            List<Children> children = new List<Children>();
            children.Add(new Children { id = 001, name = "Chizzy Chinenye", charityHome = "mark charity home", gender = "Male", familyInfo = new FamilyInfo { fathername = "", fatherstatus = "2", mothername = "", motherstatus = "2" }, handlerInfo = new HandlerInfo { name = "Chijioke", address = "myaddress", Dob = "mydateOfbirth", gender = "male", phoneNumber = "0808878788", picture = "" }, healthInfo = new HealthInfo { height = "5.0", bloodGroup = "B+", Genotype = "AA", medicalIssue = "", medicalIssueDescription = "", medicalTreatmentFee = "" }, schoolInfo = new SchoolInfo { schoolfeeAmount = "200000", classes = "A", level = "primary 1", schoolname = "that school", term = "that term" } });
            children.Add(new Children { id = 002, name = "chinwe Chinenye", charityHome = "mark charity home", gender = "female", familyInfo = new FamilyInfo { fathername = "", fatherstatus = "2", mothername = "", motherstatus = "2" }, handlerInfo = new HandlerInfo { name = "Chijioke", address = "myaddress", Dob = "mydateOfbirth", gender = "male", phoneNumber = "0808878788", picture = "" }, healthInfo = new HealthInfo { height = "5.0", bloodGroup = "B+", Genotype = "AA", medicalIssue = "", medicalIssueDescription = "", medicalTreatmentFee = "" }, schoolInfo = new SchoolInfo { schoolfeeAmount = "200000", classes = "A", level = "primary 1", schoolname = "that school", term = "that term" } });
            children.Add(new Children { id = 003, name = "Chizzy Chinenye", charityHome = "mark charity home", gender = "Male", familyInfo = new FamilyInfo { fathername = "", fatherstatus = "2", mothername = "", motherstatus = "2" }, handlerInfo = new HandlerInfo { name = "Chijioke", address = "myaddress", Dob = "mydateOfbirth", gender = "male", phoneNumber = "0808878788", picture = "" }, healthInfo = new HealthInfo { height = "5.0", bloodGroup = "B+", Genotype = "AA", medicalIssue = "", medicalIssueDescription = "", medicalTreatmentFee = "" }, schoolInfo = new SchoolInfo { schoolfeeAmount = "200000", classes = "A", level = "primary 1", schoolname = "that school", term = "that term" } });
            children.Add(new Children { id = 004, name = "Chizzy Chinenye", charityHome = "mark charity home", gender = "female", familyInfo = new FamilyInfo { fathername = "", fatherstatus = "2", mothername = "", motherstatus = "2" }, handlerInfo = new HandlerInfo { name = "Chijioke", address = "myaddress", Dob = "mydateOfbirth", gender = "male", phoneNumber = "0808878788", picture = "" }, healthInfo = new HealthInfo { height = "5.0", bloodGroup = "B+", Genotype = "AA", medicalIssue = "", medicalIssueDescription = "", medicalTreatmentFee = "" }, schoolInfo = new SchoolInfo { schoolfeeAmount = "200000", classes = "A", level = "primary 1", schoolname = "that school", term = "that term" } });
            return View();
        }
        public ActionResult Contact()
        {
            ViewBag.Title = "Home Page";

            return View();
        }
    }
}
