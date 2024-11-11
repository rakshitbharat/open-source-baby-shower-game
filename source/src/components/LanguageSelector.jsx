import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Select from "react-select";
import { setLanguage } from "../store/languageSlice";

const LanguageSelector = ({ className }) => {
  const dispatch = useDispatch();
  const { currentLanguage, availableLanguages } = useSelector(
    (state) => state.language
  );

  const getLanguageLabel = (lang) => {
    switch (lang) {
      case "gujarati":
        return "ગુજરાતી";
      case "english":
        return "English";
      default:
        return lang;
    }
  };

  const options = availableLanguages.map((lang) => ({
    value: lang,
    label: getLanguageLabel(lang),
    icon: lang === "gujarati" ? "🇮🇳" : "🇬🇧",
  }));

  const customStyles = {
    control: (provided, state) => ({
      ...provided,
      background: "white",
      borderRadius: "50px",
      border: "none",
      boxShadow: "none",
      minHeight: "44px",
      width: "100%",
      cursor: "pointer",
      display: "flex",
      justifyContent: "flex-start",
      padding: "0 8px",
    }),
    option: (provided, { isSelected, isFocused }) => ({
      ...provided,
      backgroundColor: isSelected ? "#8257E5" : isFocused ? "#F3F0FF" : "white",
      color: isSelected ? "white" : "#333",
      cursor: "pointer",
      padding: "12px 16px",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      width: "100%",
      minHeight: "44px",
      "&:active": {
        backgroundColor: "#9466FF",
      },
    }),
    singleValue: (provided) => ({
      ...provided,
      color: "#333",
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "16px",
      margin: 0,
      position: "relative",
      transform: "none",
      maxWidth: "none",
      padding: "0",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0",
      gap: "8px",
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-start",
      position: "relative",
      flex: "1",
    }),
    indicatorsContainer: (provided) => ({
      ...provided,
      padding: "0",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "0 12px",
      color: "#666",
    }),
    menu: (provided) => ({
      ...provided,
      background: "white",
      borderRadius: "12px",
      overflow: "hidden",
      animation: "slideIn 0.2s ease-out",
      boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
      margin: "8px 0",
    }),
    menuList: (provided) => ({
      ...provided,
      padding: "8px",
    }),
    indicatorSeparator: () => ({
      display: "none",
    }),
  };

  const CustomOption = ({ children, ...props }) => {
    const style = customStyles.option(
      {},
      {
        isSelected: props.isSelected,
        isFocused: props.isFocused,
      }
    );

    return (
      <div {...props.innerProps} style={style}>
        <span>{props.data.icon}</span>
        <span>{children}</span>
      </div>
    );
  };

  const SingleValue = ({ children, ...props }) => {
    const style = customStyles.singleValue({});

    return (
      <div style={style}>
        <span>{props.data.icon}</span>
        <span>{children}</span>
      </div>
    );
  };

  return (
    <div className={`language-selector ${className || ""}`}>
      <Select
        value={options.find((opt) => opt.value === currentLanguage)}
        onChange={(option) => dispatch(setLanguage(option.value))}
        options={options}
        styles={customStyles}
        components={{
          Option: CustomOption,
          SingleValue,
        }}
        isSearchable={false}
        menuPlacement="top"
        aria-label="Select language"
      />
    </div>
  );
};

export default LanguageSelector;
