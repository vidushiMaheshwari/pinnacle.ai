import React, { useState } from "react";
import { UploadCardDropzone } from "../UploadCardDropzone";
import classes from "./UploadPopup.module.css";
import Autocomplete from "@mui/material/Autocomplete";
import { colleges } from "../../../constants/colleges";
import { TextField } from "@mui/material";
import SmallAutoComplete from "./SmallAutoComplete";
import { topics } from "../../../constants/topics";

export const UploadPopup = () => {
  const [college, setCollege] = useState("");
  const [topic, setTopic] = useState("");
  const [course, setCourse] = useState("");
  const [lectureTitle, setLectureTitle] = useState("");

  const areFieldsEmpty = () => {
    // console.log(!college || !topic || !lectureTitle);
    return !college || !topic || !lectureTitle || !course;
  };

  return (
    <div className={classes.body}>
      <div className={classes.content}>
        <div className={classes.heading}> Add New Lecture Slides</div>
        <hr />
        <div className={classes.input}>
          Enter the college
          <Autocomplete
            id="college-field"
            options={colleges}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="College" />}
            value={college}
            onChange={(event, newValue) => setCollege(newValue)}
          />
        </div>
        <br />
        <div className={classes.input}>
          Enter the topic
          <Autocomplete
            id="topics-field"
            options={topics}
            sx={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Topic" />}
            value={topic}
            onChange={(event, newValue) => setTopic(newValue)}
          />
        </div>
        <br />
        <div className={classes.input}>
          Enter the course name
          <TextField id="course-name" label="Course Name" variant="outlined" sx={{ width: 300 }} required value={course}
            onChange={(e) => setCourse(e.target.value)}/>
        </div>
        <br />
        <div className={classes.input}>
          Enter the lecture title
          <TextField id="lecture-title" label="Lecture Title" variant="outlined" sx={{ width: 300 }} required value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}/>
        </div>

        <br />

        <UploadCardDropzone props={{ disable: areFieldsEmpty(), collegeName: college, topicName: topic, lectureName: lectureTitle, courseName: course }}/>
      </div>
    </div>
  );
};
