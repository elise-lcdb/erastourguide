<template>
    <div>
        <div class="flex_column gap_24">
            <h1 class="page_title">{{$t('events.title')}}</h1>
            <div class="flex_row gap_12 h_center">
                <button @click="filter = 'All'" class="event_filter_button" :class="{'is-active': filter === 'All'}">{{$t('events.filters.all')}}</button>
                <button @click="filter = 'Upcoming'" class="event_filter_button" :class="{'is-active': filter === 'Upcoming'}">{{$t('events.filters.upcoming')}}</button>
                <button @click="filter = 'North America'" class="event_filter_button" :class="{'is-active': filter === 'North America'}">{{$t('events.filters.northAmerica')}}</button>
                <button @click="filter = 'South America'" class="event_filter_button" :class="{'is-active': filter === 'South America'}">{{$t('events.filters.southAmerica')}}</button>
                <button @click="filter = 'Europe'" class="event_filter_button" :class="{'is-active': filter === 'Europe'}">{{$t('events.filters.europe')}}</button>
                <button @click="filter = 'Asia'" class="event_filter_button" :class="{'is-active': filter === 'Asia'}">{{$t('events.filters.asia')}}</button>
                <button @click="filter = 'Oceania'" class="event_filter_button" :class="{'is-active': filter === 'Oceania'}">{{$t('events.filters.oceania')}}</button>
                
            </div>
        
        <div class="events_grid">
            <div class="event_card flex_column gap_24" v-for="(event, index) in selectedDates" :key="index">
                <h1 class="title">{{ event.location }}</h1>
                <div class="flex_column gap_8">
                    <div class="flex_row gap_8 v_center">
                        <icon name="CalendarBlank" size="16"/>
                        <p class="info">
                        {{formatDate(event.date) }}
                        </p>
                    </div>
                    <div class="flex_row gap_8 v_center">
                        <icon name="House" size="16"/>
                        <p class="info">{{ event.venue }}</p>
                    </div>
                </div>
                <div class="countdown">
                    <h2 class="days_until">
                        <span v-if="countdown(event.date) === -1">
                            {{ $t('events.countdown.completed') }}
                        </span>
                        <span v-if="countdown(event.date) === 0">
                            {{ $t('events.countdown.today') }} 💜
                        </span>
                        <span v-if="countdown(event.date) === 1">
                            {{ countdown(event.date) }}
                            {{ $t('events.countdown.day') }} 🎉
                        </span>
                        <span v-if="countdown(event.date) > 1">
                            {{ countdown(event.date) }}
                            {{ $t('events.countdown.days') }}
                        </span>
                    </h2>
                </div>
            </div>
        </div>
    </div>
    </div>
</template>
<script setup lang="ts">
import moment from 'moment';
import 'moment/min/locales'
const { locale } = useI18n();


const allDates = [
    {date: '2023-03-17', location: 'Glendale, AZ 🇺🇸', venue: 'State Farm Stadium', country: "USA", continent: "North America"},
    {date: '2023-03-18', location: 'Glendale, AZ 🇺🇸', venue: 'State Farm Stadium', country: "USA", continent: "North America"},
    {date: '2023-03-24', location: 'Las Vegas, NV 🇺🇸', venue: 'Allegiant Stadium', country: "USA", continent: "North America"},
    {date: '2023-03-25', location: 'Las Vegas, NV 🇺🇸', venue: 'Allegiant Stadium', country: "USA", continent: "North America"},
    {date: '2023-03-31', location: 'Arlington, TX 🇺🇸', venue: 'AT&T Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-01', location: 'Arlington, TX 🇺🇸', venue: 'AT&T Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-02', location: 'Arlington, TX 🇺🇸', venue: 'AT&T Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-13', location: 'Tampa, FL 🇺🇸', venue: 'Raymond James Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-14', location: 'Tampa, FL 🇺🇸', venue: 'Raymond James Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-14', location: 'Tampa, FL 🇺🇸', venue: 'Raymond James Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-21', location: 'Houston, TX 🇺🇸', venue: 'NRG Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-22', location: 'Houston, TX 🇺🇸', venue: 'NRG Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-23', location: 'Houston, TX 🇺🇸', venue: 'NRG Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-28', location: 'Atlanta, GA 🇺🇸', venue: 'Mercedes-Benz Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-29', location: 'Atlanta, GA 🇺🇸', venue: 'Mercedes-Benz Stadium', country: "USA", continent: "North America"},
    {date: '2023-04-30', location: 'Atlanta, GA 🇺🇸', venue: 'Mercedes-Benz Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-05', location: 'Nashville, TN 🇺🇸', venue: 'Nissan Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-06', location: 'Nashville, TN 🇺🇸', venue: 'Nissan Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-07', location: 'Nashville, TN 🇺🇸', venue: 'Nissan Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-12', location: 'Philadelphia, PA 🇺🇸', venue: 'Lincoln Financial Field', country: "USA", continent: "North America"},
    {date: '2023-05-13', location: 'Philadelphia, PA 🇺🇸', venue: 'Lincoln Financial Field', country: "USA", continent: "North America"},
    {date: '2023-05-14', location: 'Philadelphia, PA 🇺🇸', venue: 'Lincoln Financial Field', country: "USA", continent: "North America"},
    {date: '2023-05-19', location: 'Foxborough, MA 🇺🇸', venue: 'Gillette Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-20', location: 'Foxborough, MA 🇺🇸', venue: 'Gillette Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-21', location: 'Foxborough, MA 🇺🇸', venue: 'Gillette Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-26', location: 'East Rutherford, NJ 🇺🇸', venue: 'MetLife Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-27', location: 'East Rutherford, NJ 🇺🇸', venue: 'MetLife Stadium', country: "USA", continent: "North America"},
    {date: '2023-05-28', location: 'East Rutherford, NJ 🇺🇸', venue: 'MetLife Stadium', country: "USA", continent: "North America"},
    {date: '2023-06-02', location: 'Chicago, IL 🇺🇸', venue: 'Soldier Field', country: "USA", continent: "North America"},
    {date: '2023-06-03', location: 'Chicago, IL 🇺🇸', venue: 'Soldier Field', country: "USA", continent: "North America"},
    {date: '2023-06-04', location: 'Chicago, IL 🇺🇸', venue: 'Soldier Field', country: "USA", continent: "North America"},
    {date: '2023-06-09', location: 'Detroit, MI 🇺🇸', venue: 'Ford Field', country: "USA", continent: "North America"},
    {date: '2023-06-10', location: 'Detroit, MI 🇺🇸', venue: 'Ford Field', country: "USA", continent: "North America"},
    {date: '2023-06-16', location: 'Pittsburgh, PA 🇺🇸', venue: 'Acrisure Stadium', country: "USA", continent: "North America"},
    {date: '2023-06-17', location: 'Pittsburgh, PA 🇺🇸', venue: 'Acrisure Stadium', country: "USA", continent: "North America"},
    {date: '2023-06-23', location: 'Minneapolis, MN 🇺🇸', venue: 'U.S. Bank Stadium', country: "USA", continent: "North America"},
    {date: '2023-06-24', location: 'Minneapolis, MN 🇺🇸', venue: 'U.S. Bank Stadium', country: "USA", continent: "North America"},
    {date: '2023-06-30', location: 'Cincinnati, OH 🇺🇸', venue: 'Paycor Stadium', country: "USA", continent: "North America"},
    {date: '2023-07-01', location: 'Cincinnati, OH 🇺🇸', venue: 'Paycor Stadium', country: "USA", continent: "North America"},
    {date: '2023-07-07', location: 'Kansas City, MO 🇺🇸', venue: 'GEHA Field at Arrowhead Stadium', country: "USA", continent: "North America"},
    {date: '2023-07-08', location: 'Kansas City, MO 🇺🇸', venue: 'GEHA Field at Arrowhead Stadium', country: "USA", continent: "North America"},
    {date: '2023-07-14', location: 'Denver, CO 🇺🇸', venue: 'Empower Field at Mile High', country: "USA", continent: "North America"},
    {date: '2023-07-15', location: 'Denver, CO 🇺🇸', venue: 'Empower Field at Mile High', country: "USA", continent: "North America"},
    {date: '2023-07-22', location: 'Seattle, WA 🇺🇸', venue: 'Lumen Field', country: "USA", continent: "North America"},
    {date: '2023-07-23', location: 'Seattle, WA 🇺🇸', venue: 'Lumen Field', country: "USA", continent: "North America"},
    {date: '2023-07-28', location: 'Santa Clara, CA 🇺🇸', venue: "Levi's Stadium", country: "USA", continent: "North America"},
    {date: '2023-07-29', location: 'Santa Clara, CA 🇺🇸', venue: "Levi's Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-03', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-04', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-05', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-07', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-08', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-09', location: 'Los Angeles, CA 🇺🇸', venue: "SoFi Stadium", country: "USA", continent: "North America"},
    {date: '2023-08-24', location: 'Mexico City 🇲🇽', venue: "Foro Sol", country: "Mexico", continent: "South America"},
    {date: '2023-08-25', location: 'Mexico City 🇲🇽', venue: "Foro Sol", country: "Mexico", continent: "South America"},
    {date: '2023-08-26', location: 'Mexico City 🇲🇽', venue: "Foro Sol", country: "Mexico", continent: "South America"},
    {date: '2023-08-27', location: 'Mexico City 🇲🇽', venue: "Foro Sol", country: "Mexico", continent: "South America"},
    {date: '2023-11-09', location: 'Buenos Aires 🇦🇷', venue: "Estadio River Plate", country: "Argentina", continent: "South America"},
    {date: '2023-11-10', location: 'Buenos Aires 🇦🇷', venue: "Estadio River Plate", country: "Argentina", continent: "South America"},
    {date: '2023-11-11', location: 'Buenos Aires 🇦🇷', venue: "Estadio River Plate", country: "Argentina", continent: "South America"},
    {date: '2023-11-17', location: 'Rio de Janeiro 🇧🇷', venue: "Estádio Olímpico Nilton Santos", country: "Brazil", continent: "South America"},
    {date: '2023-11-18', location: 'Rio de Janeiro 🇧🇷', venue: "Estádio Olímpico Nilton Santos", country: "Brazil", continent: "South America"},
    {date: '2023-11-19', location: 'Rio de Janeiro 🇧🇷', venue: "Estádio Olímpico Nilton Santos", country: "Brazil", continent: "South America"},
    {date: '2023-11-24', location: 'São Paulo 🇧🇷', venue: "Allianz Parque", country: "Brazil", continent: "South America"},
    {date: '2023-11-25', location: 'São Paulo 🇧🇷', venue: "Allianz Parque", country: "Brazil", continent: "South America"},
    {date: '2023-11-26', location: 'São Paulo 🇧🇷', venue: "Allianz Parque", country: "Brazil", continent: "South America"},
    {date: '2024-02-07', location: 'Tokyo 🇯🇵', venue: "Tokyo Dome", country: "Japan", continent: "Asia"},
    {date: '2024-02-08', location: 'Tokyo 🇯🇵', venue: "Tokyo Dome", country: "Japan", continent: "Asia"},
    {date: '2024-02-09', location: 'Tokyo 🇯🇵', venue: "Tokyo Dome", country: "Japan", continent: "Asia"},
    {date: '2024-02-10', location: 'Tokyo 🇯🇵', venue: "Tokyo Dome", country: "Japan", continent: "Asia"},
    {date: '2024-02-16', location: 'Melbourne 🇦🇺', venue: "Melbourne Cricket Ground", country: "Australia", continent: "Oceania"},
    {date: '2024-02-17', location: 'Melbourne 🇦🇺', venue: "Melbourne Cricket Ground", country: "Australia", continent: "Oceania"},
    {date: '2024-02-18', location: 'Melbourne 🇦🇺', venue: "Melbourne Cricket Ground", country: "Australia", continent: "Oceania"},
    {date: '2024-02-23', location: 'Sydney 🇦🇺', venue: "Accor Stadium", country: "Australia", continent: "Oceania"},
    {date: '2024-02-24', location: 'Sydney 🇦🇺', venue: "Accor Stadium", country: "Australia", continent: "Oceania"},
    {date: '2024-02-25', location: 'Sydney 🇦🇺', venue: "Accor Stadium", country: "Australia", continent: "Oceania"},
    {date: '2024-02-26', location: 'Sydney 🇦🇺', venue: "Accor Stadium", country: "Australia", continent: "Oceania"},
    {date: '2024-03-02', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-03-03', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-03-04', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-03-07', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-03-08', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-03-09', location: 'Singapore 🇸🇬', venue: "Singapore National Stadium", country: "Singapore", continent: "Asia"},
    {date: '2024-05-09', location: 'Paris 🇫🇷', venue: "Paris La Défense Arena", country: "France", continent: "Europe"},
    {date: '2024-05-10', location: 'Paris 🇫🇷', venue: "Paris La Défense Arena", country: "France", continent: "Europe"},
    {date: '2024-05-11', location: 'Paris 🇫🇷', venue: "Paris La Défense Arena", country: "France", continent: "Europe"},
    {date: '2024-05-12', location: 'Paris 🇫🇷', venue: "Paris La Défense Arena", country: "France", continent: "Europe"},
    {date: '2024-05-17', location: 'Stockholm 🇸🇪', venue: "Friends Arena", country: "Sweden", continent: "Europe"},
    {date: '2024-05-18', location: 'Stockholm 🇸🇪', venue: "Friends Arena", country: "Sweden", continent: "Europe"},
    {date: '2024-05-19', location: 'Stockholm 🇸🇪', venue: "Friends Arena", country: "Sweden", continent: "Europe"},
    {date: '2024-05-24', location: 'Lisbon 🇵🇹', venue: "Estádio da Luz", country: "Portugal", continent: "Europe"},
    {date: '2024-05-25', location: 'Lisbon 🇵🇹', venue: "Estádio da Luz", country: "Portugal", continent: "Europe"},
    {date: '2024-05-30', location: 'Madrid 🇪🇸', venue: "Santiago Bernabéu Stadium", country: "Spain", continent: "Europe"},
    {date: '2024-06-02', location: 'Lyon 🇫🇷', venue: "Groupama Stadium", country: "France", continent: "Europe"},
    {date: '2024-06-03', location: 'Lyon 🇫🇷', venue: "Groupama Stadium", country: "France", continent: "Europe"},
    {date: '2024-06-07', location: 'Edinburgh 🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: "Murrayfield Stadium", country: "Scotland", continent: "Europe"},
    {date: '2024-06-08', location: 'Edinburgh 🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: "Murrayfield Stadium", country: "Scotland", continent: "Europe"},
    {date: '2024-06-09', location: 'Edinburgh 🏴󠁧󠁢󠁳󠁣󠁴󠁿', venue: "Murrayfield Stadium", country: "Scotland", continent: "Europe"},
    {date: '2024-06-13', location: 'Liverpool 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Anfield", country: "England", continent: "Europe"},
    {date: '2024-06-14', location: 'Liverpool 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Anfield", country: "England", continent: "Europe"},
    {date: '2024-06-15', location: 'Liverpool 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Anfield", country: "England", continent: "Europe"},
    {date: '2024-06-18', location: 'Cardiff 🏴󠁧󠁢󠁷󠁬󠁳󠁿', venue: "Principality Stadium", country: "England", continent: "Europe"},
    {date: '2024-06-21', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-06-22', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-06-23', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-06-28', location: 'Dublin 🇮🇪', venue: "Aviva Stadium", country: "Ireland", continent: "Europe"},
    {date: '2024-06-29', location: 'Dublin 🇮🇪', venue: "Aviva Stadium", country: "Ireland", continent: "Europe"},
    {date: '2024-06-30', location: 'Dublin 🇮🇪', venue: "Aviva Stadium", country: "Ireland", continent: "Europe"},
    {date: '2024-07-04', location: 'Amsterdam 🇳🇱', venue: "Johan Cruyff Arena", country: "Netherlands", continent: "Europe"},
    {date: '2024-07-05', location: 'Amsterdam 🇳🇱', venue: "Johan Cruyff Arena", country: "Netherlands", continent: "Europe"},
    {date: '2024-07-06', location: 'Amsterdam 🇳🇱', venue: "Johan Cruyff Arena", country: "Netherlands", continent: "Europe"},
    {date: '2024-07-09', location: 'Zürich 🇨🇭', venue: "Letzigrund", country: "Switzerland", continent: "Europe"},
    {date: '2024-07-10', location: 'Zürich 🇨🇭', venue: "Letzigrund", country: "Switzerland", continent: "Europe"},
    {date: '2024-07-13', location: 'Milan 🇮🇹', venue: "San Siro", country: "Italy", continent: "Europe"},
    {date: '2024-07-14', location: 'Milan 🇮🇹', venue: "San Siro", country: "Italy", continent: "Europe"},
    {date: '2024-07-17', location: 'Gelsenkirchen 🇩🇪', venue: "Veltins-Arena", country: "Germany", continent: "Europe"},
    {date: '2024-07-18', location: 'Gelsenkirchen 🇩🇪', venue: "Veltins-Arena", country: "Germany", continent: "Europe"},
    {date: '2024-07-19', location: 'Gelsenkirchen 🇩🇪', venue: "Veltins-Arena", country: "Germany", continent: "Europe"},
    {date: '2024-07-23', location: 'Hamburg 🇩🇪', venue: "Volksparkstadion", country: "Germany", continent: "Europe"},
    {date: '2024-07-24', location: 'Hamburg 🇩🇪', venue: "Volksparkstadion", country: "Germany", continent: "Europe"},
    {date: '2024-07-27', location: 'Munich 🇩🇪', venue: "Olympiastadion", country: "Germany", continent: "Europe"},
    {date: '2024-07-28', location: 'Munich 🇩🇪', venue: "Olympiastadion", country: "Germany", continent: "Europe"},
    {date: '2024-08-01', location: 'Warsaw 🇵🇱', venue: "PGE Narodowy", country: "Poland", continent: "Europe"},
    {date: '2024-08-02', location: 'Warsaw 🇵🇱', venue: "PGE Narodowy", country: "Poland", continent: "Europe"},
    {date: '2024-08-03', location: 'Warsaw 🇵🇱', venue: "PGE Narodowy", country: "Poland", continent: "Europe"},
    {date: '2024-08-08', location: 'Vienna 🇦🇹', venue: "Ernst-Happel-Stadion", country: "Austria", continent: "Europe"},
    {date: '2024-08-09', location: 'Vienna 🇦🇹', venue: "Ernst-Happel-Stadion", country: "Austria", continent: "Europe"},
    {date: '2024-08-10', location: 'Vienna 🇦🇹', venue: "Ernst-Happel-Stadion", country: "Austria", continent: "Europe"},
    {date: '2024-08-15', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-08-16', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-08-17', location: 'London 🏴󠁧󠁢󠁥󠁮󠁧󠁿', venue: "Wembley Stadium", country: "England", continent: "Europe"},
    {date: '2024-10-18', location: 'Miami, FL 🇺🇸', venue: "Hard Rock Stadium", country: "USA", continent: "North America"},
    {date: '2024-10-19', location: 'Miami, FL 🇺🇸', venue: "Hard Rock Stadium", country: "USA", continent: "North America"},
    {date: '2024-10-20', location: 'Miami, FL 🇺🇸', venue: "Hard Rock Stadium", country: "USA", continent: "North America"},
    {date: '2024-10-25', location: 'New Orleans, LA 🇺🇸', venue: "Caesars Superdome", country: "USA", continent: "North America"},
    {date: '2024-10-26', location: 'New Orleans, LA 🇺🇸', venue: "Caesars Superdome", country: "USA", continent: "North America"},
    {date: '2024-10-27', location: 'New Orleans, LA 🇺🇸', venue: "Caesars Superdome", country: "USA", continent: "North America"},
    {date: '2024-11-01', location: 'Indianapolis, IN 🇺🇸', venue: "Lucas Oil Stadium", country: "USA", continent: "North America"},
    {date: '2024-11-02', location: 'Indianapolis, IN 🇺🇸', venue: "Lucas Oil Stadium", country: "USA", continent: "North America"},
    {date: '2024-11-03', location: 'Indianapolis, IN 🇺🇸', venue: "Lucas Oil Stadium", country: "USA", continent: "North America"},
    {date: '2024-11-14', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
    {date: '2024-11-15', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
    {date: '2024-11-16', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
    {date: '2024-11-21', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
    {date: '2024-11-22', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
    {date: '2024-11-23', location: 'Toronto 🇨🇦', venue: "Rogers Centre", country: "Canada", continent: "North America"},
]  
const today  = computed(() => {
    return moment().startOf('day');
})
const filter = ref('Upcoming' as String)
const currentDate = computed(() => {
    return new Date()
})
const selectedDates = computed(() => {
    let filteredDates = allDates
    if(filter.value === 'All'){
        filteredDates = upcomingDates(allDates)
        filteredDates = filteredDates.concat(completedDates(allDates))
    }
    if(filter.value === 'Upcoming'){
         filteredDates =  upcomingDates(allDates)
    }
    if(filter.value === 'North America'){
        let northAmerica = allDates.filter(d => d.continent === 'North America')
        filteredDates = upcomingDates(northAmerica)
        filteredDates = filteredDates.concat(completedDates(northAmerica))
    }
    if(filter.value === 'South America'){
        let southAmerica = allDates.filter(d => d.continent === 'South America')
        filteredDates = upcomingDates(southAmerica)
        filteredDates = filteredDates.concat(completedDates(southAmerica))
    }
    if(filter.value === 'Europe'){
        let europe = allDates.filter(d => d.continent === 'Europe')
        filteredDates = upcomingDates(europe)
        filteredDates = filteredDates.concat(completedDates(europe))
    }
    if(filter.value === 'Asia'){
        let asia = allDates.filter(d => d.continent === 'Asia')
        filteredDates = upcomingDates(asia)
        filteredDates = filteredDates.concat(completedDates(asia))
    }
    if(filter.value === 'Oceania'){
        let oceania = allDates.filter(d => d.continent === 'Oceania')
        filteredDates = upcomingDates(oceania)
        filteredDates = filteredDates.concat(completedDates(oceania))
    }
    return filteredDates
})

const upcomingDates = function(events: Array<any>){
    return events.filter(event => new Date(event.date) >= currentDate.value);
}
const completedDates = function(events: Array<any>){
    return events.filter(event => new Date(event.date) <= currentDate.value);
}
const countdown = function(tourDate: string){
    const targetDate = new Date(tourDate);
    let timeDifference = targetDate - currentDate.value;
    let daysDifference = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));
    if(daysDifference >= 0){
        return daysDifference
    }else{
        return -1
    }
    
}
const formatDate = function(tourDate: string){
    const dateFormatter = new Intl.DateTimeFormat(locale.value, {weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'});
    return dateFormatter.format(new Date(tourDate));
}
</script>
<style lang="scss" scoped>
.events_grid{
    display: grid;
    
    grid-template-rows: 1fr;
    grid-column-gap: 24px;
    grid-row-gap: 24px;
}
@media screen and (min-width: 1001px){
    .events_grid{
        grid-template-columns: repeat(3, 1fr);
    }
}
@media screen and (min-width: 700px) and (max-width: 1000px){
    .events_grid{
        grid-template-columns: repeat(2, 1fr);
    }
}
@media screen and (max-width: 699px){
    .events_grid{
        grid-template-columns: repeat(1, 1fr);
    }
}
.event_card{
    padding: 24px;
    border-radius: 8px;
    .title{
        font-size: 24px;
        font-style: normal;
        font-weight: 700;
        line-height: 36px; /* 150% */
        letter-spacing: -0.48px;
    }
    .info{
        font-size: 16px;
        font-style: normal;
        font-weight: 400;
        line-height: 24px; 
    }
    .countdown{
        border-radius: 8px;
        padding: 8px;

        .days_until{
            font-size: 24px;
            font-style: normal;
            font-weight: 700;
            line-height: 36px; /* 150% */
            letter-spacing: -0.48px;
        }
    }
}
</style>