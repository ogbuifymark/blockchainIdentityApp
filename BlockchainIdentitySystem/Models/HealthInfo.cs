using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace BlockchainIdentitySystem.Models
{
    public class HealthInfo
    {
        public string height { get; set; }
        public string bloodGroup { get; set; }
        public string Genotype { get; set; }
        public string medicalIssue { get; set; }
        public string medicalIssueDescription { get; set; }
        public string medicalTreatmentFee { get; set; }
        public bool NeedMedAttension { get; set; }
    }
}