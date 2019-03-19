using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace neighborhoodDealer.Models
{
    public class login
    {
        [Required(ErrorMessage="Email is required.")]
        [EmailAddress(ErrorMessage = "Invalid email.")]
        public string email{get;set;}
        
        [Required(ErrorMessage="Password is required.")]
        [DataType(DataType.Password)]
        public string password{get;set;}
        
    }
}