import "./App.css";
import { Route, Routes } from "react-router-dom";

//PAGE NOT FOUND CONTAINER
import PageNotFound from "./containers/Main/PageNotFound";

//MAIN COMMON PAGES IMPORT
import Home from "./containers/Main/Home";
import MainLoginScr from './containers/Main/MainLoginScr';
import MainRegisterScr from './containers/Main/MainRegisterScr';

//STUDENT PAGES IMPORT 
import StudentLoginScr from "./containers/Student/Login/StudentLoginScr";
import StudentRegisterScr from "./containers/Student/Register/StudentRegisterSrc";
import StudentScr from "./components/Student/Outlet/Student";
import StudentDashboard from "./containers/Student/StudentDash/StudentDashScr";
import ViewStudentProfile from "./containers/Student/Profile/ViewStudentProfileScr";
import EditStudentProfile from "./containers/Student/Profile/EditStudentProfileScr";
import ViewStudentAddressScr from "./containers/Student/Address/ViewStudentAddressScr";
import EditStudentPerAddressScr from "./containers/Student/Address/EditStudentPerAddressScr";
import EditStudentTempAddressScr from "./containers/Student/Address/EditStudentTempAddressScr";
import ViewStudentQualifyScr from "./containers/Student/Qualification/ViewStudentQualifyScr";
import EditStudentQualifyScr from "./containers/Student/Qualification/EditStudentQualifyScr";
import EditStdUpload from "./containers/Student/document/EditStudentUploadScr";
import EventsDescription from "./containers/Student/Event/EventDescriptionScr";
import ViewEvent from "./containers/Student/Event/EventListScr";
import JobsStudentList from "./containers/Student/Job/JobListScr";
import JobsDescription from "./containers/Student/Job/JobDescriptionScr";
import ContactForm from "./containers/Student/Contact/ContactScr";
import ResetStudentPass from "./containers/Student/ChangePass/ResetStudentPassScr";
import ChangeStudentPass from './containers/Student/ChangePass/ChangeStudentPassScr'

//ONETIMEFORM STUDENT IMPORT 
import StudentDashOneTime from "./components/OneTimeForm/Student";
import AddStudentProfileScr from "./containers/OneTimeForm/AddStudentProfileScr";
import AddStudentPerAddressScr from "./containers/OneTimeForm/AddStudentPerAddressScr";
import AddStudentTempAddressScr from "./containers/OneTimeForm/AddStudentTempAddressScr";
import AddStudentEducatScr from "./containers/OneTimeForm/AddStudentEducatScr";
import Reviewform from "./components/OneTimeForm/Review";
import AddStudentPictureScr from "./containers/OneTimeForm/AddStudentPictureScr";
import AddStudentUploadScr from "./containers/OneTimeForm/AddStudentUploadScr";

//RECRUITER PAGES IMPORT 
import RecruiterScr from "./containers/Recruiter/Outlet/RecruiterScr";
import CompanyLoginScr from "./containers/Recruiter/Login/CompanyLoginScr";
import CompanyRegisterScr from "./containers/Recruiter/Register/CompanyRegisterScr";
import ContactFormScr from './containers/Recruiter/Contact/ContactScr'
import ChangeRecruiterPass from "./components/Recruiters/ChangePass/ChangeRecruiterPass";
import ResetRecruiterPass from "./components/Recruiters/ChangePass/ResetRecruiterPass";
import RecruiterDashScr from './containers/Recruiter/RecruiterDash/RecruiterDashScr';
import JobRecruiterList from "./containers/Recruiter/Job/JobListScr";
import AddRecruiterJob from './containers/Recruiter/Job/AddJobScr';
import JobRecruiterDescriptionScr from "./containers/Recruiter/Job/JobDescriptionScr";
import CompanyForm from './containers/Recruiter/CompanyForm/CompanyFormScr';
import ViewJobApplyList from './containers/Recruiter/Job/ViewApplyScr';

//FORGET PASSWORD FOR STUDENTS LOGIN
import ChangeStudentPassword from "./components/Student/Password/resetPass";
import ResetStudentPassword from "./components/Student/Password/changePass";

//FORGET PASSWORD FOR RECRUITER OR ADMIN LOGIN
import ChangeRecruiterPassword from "./components/Recruiters/Password/ChangePass";
import ResetRecruiterPassword from "./components/Recruiters/Password/ResetPass";

// imports for the admin profile
import Admin from "./containers/Admin/outlet/AdminScreen";
import StudentListScr from "./containers/Admin/student/StudentScr";
import RecruiterListScr from "./containers/Admin/recruiter/RecruiterScr";
import AdminListScr from "./containers/Admin/admin/Admin";
import AddAdminScr from "./containers/Admin/admin/AddAdminScreen";
import ViewStudentScr from "./containers/Admin/student/StudentFilterListScr";
import AddJobScr from "./containers/Admin/jobs/AddJobForm";
import AddEventScr from "./containers/Admin/events/AddEventForm";
import ViewJobsScr from "./containers/Admin/jobs/JobListScr";
import ViewEventsScr from "./containers/Admin/events/EventListScr";
import JobsDescriptionScr from "./containers/Admin/jobs/JobDescriptionScr";
import EventsDescriptionScr from "./containers/Admin/events/EventDescriptionScr";
import ImportScv from "./containers/Admin/importCsv/ImportFileScr";
import ViewJobApplyScr from "./containers/Admin/jobs/JobApplyScr";

// imports for the recruiter profile
import ViewDocument from "./components/Student/Documents/ViewStudentDocument";


function App() {
  return (
    <div>
      {/* MAIN COMMON PAGES ROUTES */}
      <Routes>
        {/* Home Page */}
        <Route path="/" element={<Home />} />

        {/* Register & Login Page */}
        <Route path="/register" element={<MainRegisterScr />} />
        <Route path="/login" element={<MainLoginScr />} />

        {/* Student login & Register */}
        <Route path="/stdlogin" element={<StudentLoginScr />} />
        <Route path="/stdregister" element={<StudentRegisterScr />} />

        {/* Company login & Register */}
        <Route path="/compregister" element={<CompanyRegisterScr />} />
        <Route path="/complogin" element={<CompanyLoginScr />} />

        {/* forget pass student */}
        <Route path="/reset-password" element={<ChangeStudentPassword />} />
        <Route path="/change-password" element={<ResetStudentPassword />} />

        {/* forget pass recruiter */}
        <Route path="/reset-recruiter-password" element={<ResetRecruiterPassword />} />
        <Route path="/change-recruiter-password" element={<ChangeRecruiterPassword />} />

        {/* Student Outlet */}
        <Route path="/student" element={<StudentScr />}>
          <Route path="dashboard" element={<StudentDashboard />} />
          <Route path="stdprofile" element={<ViewStudentProfile />} />
          <Route path="stdaddress" element={<ViewStudentAddressScr />} />
          <Route path="stdqualify" element={<ViewStudentQualifyScr />} />
          <Route path="editstdupload" element={<EditStdUpload />} />
          <Route path="editstdprofile" element={<EditStudentProfile />} />
          <Route path="editstdperaddress" element={<EditStudentPerAddressScr />} />
          <Route path="editstdtempaddress" element={<EditStudentTempAddressScr />} />
          <Route path="editstdqualify/:id" element={<EditStudentQualifyScr />} />
          <Route path="sendmail" element={<ContactForm />} />
          <Route path="jobsnotify" element={<JobsStudentList />} />
          <Route path="jobsnotify/:jobPostid/:company" element={<JobsDescription />} />
          <Route path="viewEvent" element={<ViewEvent />} />
          <Route path="viewEvent/:id/:title" element={<EventsDescription />} />
          <Route path="viewDocument" element={<ViewDocument />} />
          <Route path="reset-pass" element={<ResetStudentPass />} />
          <Route path="change-password" element={<ChangeStudentPass />} />
        </Route>

        {/* ONETIME STUDENT OUTLET */}
        <Route path="/onetimeform" element={<StudentDashOneTime />}>
          <Route path="addstdprofile" element={<AddStudentProfileScr />} />
          <Route path="addstdperaddress" element={<AddStudentPerAddressScr />} />
          <Route path="addstdtempaddress" element={<AddStudentTempAddressScr />} />
          <Route path="addstdeducat" element={<AddStudentEducatScr />} />
          <Route path="addstdupload" element={<AddStudentUploadScr />} />
          <Route path="reviewform" element={<Reviewform />} />
          <Route path="upload" element={<AddStudentPictureScr />} />
        </Route>

        {/* Admin Routes */}
        <Route path="/admin" element={<Admin />}>
          <Route path="managestd" element={<StudentListScr />} />
          <Route path="managecomp" element={<RecruiterListScr />} />
          <Route path="manageadmin" element={<AdminListScr />} />
          <Route path="addadmin" element={<AddAdminScr />} />
          <Route path="addJob" element={<AddJobScr />} />
          <Route path="addEvent" element={<AddEventScr />} />
          <Route path="change-password" element={<ChangeRecruiterPass />} />
          <Route path="reset-password" element={<ResetRecruiterPass />} />
          <Route path="viewJob" element={<ViewJobsScr />} />
          <Route path="viewJob/:id/:company" element={<JobsDescriptionScr />} />
          <Route path="viewJob/:id" element={<ViewJobApplyScr />} />
          <Route path="viewEvent" element={<ViewEventsScr />} />
          <Route path="viewEvent/:id/:title" element={<EventsDescriptionScr />} />
          <Route path="managestd/:course/:department?/:faculty?" element={<ViewStudentScr />} />
          <Route path="uploadfile" element={<ImportScv />} />
        </Route>

        {/* Recruiter Routes */}
        <Route path="/recruiter" element={<RecruiterScr />}>
          <Route path="contact-form" element={<ContactFormScr />} />
          <Route path="change-password" element={<ChangeRecruiterPass />} />
          <Route path="reset-password" element={<ResetRecruiterPass />} />
          <Route path="dashboard" element={<RecruiterDashScr />} />
          <Route path="jobs/:id" element={<JobRecruiterList />} />
          <Route path="add-job" element={<AddRecruiterJob />} />
          <Route path="jobs/:recruiter/:id" element={<JobRecruiterDescriptionScr />} />
          <Route path="jobs/:recruiter/:id/:position" element={<ViewJobApplyList />} />
        </Route>

        <Route path="addCompanyDetails" element={<CompanyForm />} />
        {/* Page Not Found Route */}
        <Route path="/*" element={<PageNotFound />} />

      </Routes>
    </div>
  );
}

export default App;
