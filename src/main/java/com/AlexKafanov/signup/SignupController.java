package com.AlexKafanov.signup;

import com.AlexKafanov.account.Account;
import com.AlexKafanov.account.AccountService;
import com.AlexKafanov.support.web.MessageHelper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.Errors;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.mvc.support.RedirectAttributes;

import javax.validation.Valid;

@Controller
public class SignupController {

    private static final String SIGNUP_VIEW_NAME = "signup/signup";

	@Autowired
	private AccountService accountService;
	
	@RequestMapping(value = "signup")
	public String signup(Model model) {
		model.addAttribute(new SignupForm());
        return SIGNUP_VIEW_NAME;
	}
	
	@RequestMapping(value = "signup", method = RequestMethod.POST)
	public String signup(@Valid @ModelAttribute SignupForm signupForm, Errors errors, RedirectAttributes ra) {
		if (errors.hasErrors()) {
			return SIGNUP_VIEW_NAME;
		}
		Account account = signupForm.createAccount();
		if (accountService.isHasUser(account.getEmail())){
			errors.reject("This Email already exist.");
			return SIGNUP_VIEW_NAME;
		}
		accountService.save(account);
		accountService.signin(account);

        MessageHelper.addSuccessAttribute(ra, "signup.success");
		return "redirect:/";
	}
}
