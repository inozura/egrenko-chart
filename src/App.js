import "@grapecity/wijmo.styles/wijmo.css";
import "bootstrap/scss/bootstrap.scss";
import "./App.css";
//
import * as React from "react";
//
import * as wjCore from "@grapecity/wijmo";
import * as wjChart from "@grapecity/wijmo.react.chart";
import * as wjInput from "@grapecity/wijmo.react.input";
import * as wjFinance from "@grapecity/wijmo.react.chart.finance";
import { getData } from "./data";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: getData(),
      rmData: [
        { text: "Fixed", parm: "Fixed" },
        { text: "Average True Range", parm: "ATR" },
      ],
      fieldsData: [
        { text: "High", parm: "High" },
        { text: "Low", parm: "Low" },
        { text: "Open", parm: "Open" },
        { text: "Close", parm: "Close" },
        { text: "HL AVG.", parm: "HL2" },
        { text: "HLC Avg.", parm: "HLC3" },
        { text: "HLOC Avg.", parm: "HLOC4" },
      ],
      rangeModeText: "Fixed",
      fieldsText: "Close",
      options: {
        renko: {
          boxSize: 2,
          rangeMode: "Fixed",
          fields: "Close",
        },
      },
      style: {
        stroke: "rgb(255, 0, 0)",
        fill: "rgba(136, 189, 230, 0.701961)",
      },
      altStyle: {
        stroke: "rgb(136, 189, 230)",
        fill: "transparent",
      },
    };
  }
  render() {
    return (
      <div className="container-fluid">
        <h3>Example React Renko Chart - Novandra</h3>
        <div className="panel-group" id="settings">
          <div className="panel panel-default">
            <div id="settingsBody" className="panel-collapse collapse in">
              <div className="panel-body">
                <ul className="list-inline">
                  <li>
                    <label>Box Size</label>
                    <wjInput.InputNumber
                      initialized={this.initializeInput.bind(this)}
                      value={this.state.options.renko.boxSize}
                      min={0}
                      step={1}
                      format="n0"
                      valueChanged={this.boxSizeChanged.bind(this)}
                    ></wjInput.InputNumber>
                  </li>
                  <li>
                    <wjInput.Menu
                      header="Range Mode"
                      value={this.state.options.renko.rangeMode}
                      itemClicked={this.rangeModeChanged.bind(this)}
                    >
                      <wjInput.MenuItem value="Fixed">Fixed</wjInput.MenuItem>
                      <wjInput.MenuItem value="ATR">
                        Average True Range
                      </wjInput.MenuItem>
                    </wjInput.Menu>
                  </li>
                  <li>
                    <wjInput.Menu
                      header="Data Fields"
                      value={this.state.options.renko.fields}
                      itemClicked={this.fieldsChanged.bind(this)}
                    >
                      <wjInput.MenuItem value="High">High</wjInput.MenuItem>
                      <wjInput.MenuItem value="Low">Low</wjInput.MenuItem>
                      <wjInput.MenuItem value="Open">Open</wjInput.MenuItem>
                      <wjInput.MenuItem value="Close">Close</wjInput.MenuItem>
                      <wjInput.MenuItem value="HL2">HL Avg.</wjInput.MenuItem>
                      <wjInput.MenuItem value="HLC3">HLC Avg.</wjInput.MenuItem>
                      <wjInput.MenuItem value="HLOC4">
                        HLOC Avg.
                      </wjInput.MenuItem>
                    </wjInput.Menu>
                  </li>
                </ul>
                <ul className="list-inline">
                  <li>
                    <label>Stroke</label>
                    <wjInput.InputColor
                      value={this.state.style.stroke}
                      valueChanged={this.strokeChanged.bind(this)}
                    ></wjInput.InputColor>
                  </li>
                  <li>
                    <label>Alt. Stroke</label>
                    <wjInput.InputColor
                      value={this.state.altStyle.stroke}
                      valueChanged={this.altStrokeChanged.bind(this)}
                    ></wjInput.InputColor>
                  </li>
                </ul>
                <ul className="list-inline">
                  <li>
                    <label>Fill</label>
                    <wjInput.InputColor
                      value={this.state.style.fill}
                      valueChanged={this.fillChanged.bind(this)}
                    ></wjInput.InputColor>
                  </li>
                  <li>
                    <label>Alt. Fill</label>
                    <wjInput.InputColor
                      value={this.state.altStyle.fill}
                      valueChanged={this.altFillChanged.bind(this)}
                    ></wjInput.InputColor>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <wjFinance.FinancialChart
          initialized={this.initializeChart.bind(this)}
          itemsSource={this.state.data}
          bindingX="date"
          chartType="Renko"
          options={this.state.options}
          tooltipContent="tooltip"
        >
          <wjFinance.FinancialChartSeries
            binding="high,low,open,close"
            name="Facebook"
            style={this.state.style}
            altStyle={this.state.altStyle}
          ></wjFinance.FinancialChartSeries>
          <wjChart.FlexChartLegend position="None"></wjChart.FlexChartLegend>
        </wjFinance.FinancialChart>
      </div>
    );
  }
  initializeChart(flex) {
    this.theChart = flex;
    this.ser = flex.series[0];
  }
  initializeInput(input) {
    this.inputNumber = input;
  }
  tooltip(ht) {
    var date = ht.item && ht.item.date ? ht.item.date : null,
      content = "";
    //
    if (wjCore.isDate(date)) {
      date = wjCore.Globalize.formatDate(date, "MM/dd/yy");
    }
    if (ht && ht.item) {
      content =
        "<b>" +
        ht.name +
        "</b><br/>" +
        "Date: " +
        date +
        "<br/>" +
        "Open: " +
        wjCore.Globalize.format(ht.item.open, "n2") +
        "<br/>" +
        "High: " +
        wjCore.Globalize.format(ht.item.high, "n2") +
        "<br/>" +
        "Low: " +
        wjCore.Globalize.format(ht.item.low, "n2") +
        "<br/>" +
        "Close: " +
        wjCore.Globalize.format(ht.item.close, "n2") +
        "<br/>" +
        "Volume: " +
        wjCore.Globalize.format(ht.item.volume, "n0");
    }
    return content;
  }
  strokeChanged(input) {
    this.setState({
      style: {
        stroke: input.value,
        fill: this.state.style.fill,
      },
    });
    this.ser.style.stroke = input.value;
    this.optionChanged();
  }
  altStrokeChanged(input) {
    this.setState({
      altStyle: {
        stroke: input.value,
        fill: this.state.altStyle.fill,
      },
    });
    this.ser.altStyle.stroke = input.value;
    this.optionChanged();
  }
  fillChanged(input) {
    this.setState({
      style: {
        fill: input.value,
        stroke: this.state.style.stroke,
      },
    });
    this.ser.style.fill = input.value;
    this.optionChanged();
  }
  altFillChanged(input) {
    this.setState({
      altStyle: {
        fill: input.value,
        stroke: this.state.altStyle.stroke,
      },
    });
    this.ser.altStyle.fill = input.value;
    this.optionChanged();
  }
  optionChanged() {
    if (this.theChart) {
      this.theChart.invalidate();
    }
  }
  boxSizeChanged(input) {
    if (input.value < input.min || (input.max && input.value > input.max)) {
      return;
    }
    this.setState({
      options: {
        renko: {
          boxSize: input.value,
        },
      },
    });
    if (this.theChart) {
      this.theChart.invalidate();
    }
  }
  rangeModeChanged(menu) {
    var input = this.inputNumber;
    let selectedValue = menu.selectedValue;
    this.setState({
      rangeModeText: selectedValue,
      options: {
        renko: {
          rangeMode: selectedValue,
          boxSize: this.state.options.renko.boxSize,
          fields: this.state.options.renko.fields,
        },
      },
    });
    if (selectedValue === "ATR") {
      input.format = "n0";
      input.min = 2;
      input.max = this.state.data.length - 2;
      input.value = wjCore.clamp(input.value, 14, this.state.data.length - 2);
      input.step = 1;
    } else {
      input.format = "n0";
      input.min = 1;
      input.max = null;
      input.step = 1;
    }
    this.optionChanged();
  }
  fieldsChanged(menu) {
    var input = this.inputNumber;
    let selectedValue = menu.selectedValue;
    this.setState({
      fieldsText: selectedValue,
      options: {
        renko: {
          boxSize: this.state.options.renko.boxSize,
          fields: selectedValue,
          rangeMode: this.state.options.renko.rangeMode,
        },
      },
    });
    console.log(this.state.options);
    this.optionChanged();
  }
}

export default App;
