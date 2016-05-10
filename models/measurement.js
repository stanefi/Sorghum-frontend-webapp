var Measurement = {
  ACRES:	"FLOAT NOT NULL",
  HEADS_PER_ACRE:	"INTEGER NOT NULL",
  ROW_SPACING:	"FLOAT NOT NULL",
  APP_AREA:	"FLOAT NOT NULL",
  SEEDS_PER_POUND:	"FLOAT NOT NULL",
  longitude: "decimal(12,9)",
  latitude:  "decimal(12,9)",
  date_time: "TEXT",
  image_path: "TEXT",
  county: "TEXT"
};

module.exports = exports = Measurement;