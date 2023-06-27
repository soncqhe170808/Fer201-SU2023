import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
// test commit
const Register = () => {
    const [id, idchange] = useState("");
    const [email, emailchange] = useState("");
    const [password, passwordchange] = useState("");
    const [phone, phonechange] = useState("");
    const [address, addresschange] = useState("");
    const [roleId, roleIdchange] = useState("");
    const [Name, Namechange] = useState("");
    const [BanStatus, BanStatuschange] = useState("");
    const [FieldOfExpertise, FieldOfExpertisechange] = useState("");
    const navigate = useNavigate();


    useEffect(() => {
        fetch("http://localhost:9999/user")
            .then((response) => response.json())
            .then((data) => {
                const sortedUsers = data.sort((a, b) => a.id - b.id);
                const maxId = sortedUsers.length > 0 ? sortedUsers[sortedUsers.length - 1].id : 0;
                // Increment the highest ID by 1 and set it as the initial ID value
                const nextId = maxId + 1;
                // Set the initial ID value
                idchange(nextId);
            })
            .catch((error) => {
                console.error("Error fetching users:", error);
            });
    }, []);

    useEffect(() => {
        fetch("http://localhost:9999/FieldOfExpertise").then(res => res.json())
            .then(result => {
                FieldOfExpertisechange(result);
            })
    }, []);

    const IsValidate = () => {
        let isproceed = true;
        let errormessage = "Please enter the value in ";
        if (Name === null || Name === "") {
            isproceed = false;
            errormessage += " Fullname";
        }
        if (password === null || password === "") {
            isproceed = false;
            errormessage += " Password";
        }
        if (email === null || email === "" || email.length <=8 || email.length>= 30) {
            isproceed = false;
            errormessage += " Email";
        }

        if (!isproceed) {
            toast.warning(errormessage);
        } else {
            if (/^[a-zA-Z0-9]+@[a-zA-Z0-9]+\.[A-Za-z]+$/.test(email)) {
                // Valid email
            } else {
                isproceed = false;
                toast.warning("Please enter a valid email");
            }
        }
        return isproceed;
    };

    const handlesubmit = (e) => {
        e.preventDefault();
        let regobj = {
            Name,
            password,
            email,
            phone,
            address,
            roleId,
            FieldOfExpertise,
            BanStatus: 0,
        };
        if (IsValidate()) {
            fetch("http://localhost:9999/user", {
                method: "POST",
                headers: { "content-type": "application/json" },
                body: JSON.stringify(regobj),
            })
                .then((res) => {
                    toast.success("Registered successfully.");
                    navigate("/login");
                })
                .catch((err) => {
                    toast.error("Failed: " + err.message);
                });
        }
    };
    return (
        <div>
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>
                    <div className="card">
                        <div className="card-header">
                            <h1>User Registeration</h1>
                        </div>
                        <div className="card-body">
                            <div className="row">
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Email <span className="errmsg">*</span></label>
                                        <input value={email} onChange={e => emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Password <span className="errmsg">*</span></label>
                                        <input value={password} onChange={e => passwordchange(e.target.value)} type="password" className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Full Name <span className="errmsg">*</span></label>
                                        <input value={Name} onChange={e => Namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Phone <span className="errmsg"></span></label>
                                        <input value={phone} onChange={e => phonechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>Role <span className="errmsg">*</span></label>
                                        <select value={roleId} onChange={e => roleIdchange(e.target.value)} className="form-control">
                                            <option value="">Choose Role</option>
                                            <option value="1">Candidate</option>
                                            <option value="2">Company</option>

                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-6">
                                    <div className="form-group">
                                        <label>FieldOfExpertise <span className="errmsg">*</span></label>
                                        <select value={FieldOfExpertise} onChange={e => FieldOfExpertisechange(e.target.value)} className="form-control">
                                        <option value="">Choose Field Of Expertise</option>
                                            <option value="1">Software Engineering</option>
                                            <option value="2">Digital Art Design</option>
                                            <option value="3">Artificial intelligence</option>
                                        </select>
                                    </div>
                                </div>
                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Address</label>
                                        <textarea value={address} onChange={e => addresschange(e.target.value)} className="form-control"></textarea>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="card-footer">
                            <button type="submit" className="btn btn-primary">Register</button>
                            <Link to={'/login'} className="btn btn-danger">Close</Link>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    );
}

export default Register;