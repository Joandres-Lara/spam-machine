import withIronSessionApi from "@lib/with-iron-session-api";

export default withIronSessionApi(async (req, res) => {
 req.session.destroy();
 res.redirect("/signin");
});
