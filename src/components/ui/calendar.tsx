import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker, useDayPicker, useNavigation } from "react-day-picker"

import { cn } from "@/lib/utils"
import { buttonVariants } from "@/components/ui/button"
import { Select, SelectTrigger, SelectItem, SelectContent } from "./select"
import { format, setMonth } from "date-fns"


function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: React.ComponentProps<typeof DayPicker>) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("p-3", className)}
      classNames={{
        months: "flex flex-col sm:flex-row gap-2",
        month: "flex flex-col gap-4",
        caption: "flex justify-center pt-1 relative items-center w-62",
        caption_label: "text-sm font-medium hidden ",
        nav: "flex items-center gap-1",
        nav_button: cn(
          buttonVariants({ variant: "outline" }),
          "size-7 bg-transparent p-0 opacity-50 hover:opacity-100"
        ),
        nav_button_previous: "absolute left-1",
        nav_button_next: "absolute right-1",
        table: "w-62 border-collapse space-x-1 bg-gray-900 rounded-md",
        head_row: "flex justify-center w-62",
        head_cell:
          "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
        row: "flex justify-center w-62 mt-2",
        cell: cn(
          "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-range-end)]:rounded-r-md",
          props.mode === "range"
            ? "[&:has(>.day-range-end)]:rounded-r-md [&:has(>.day-range-start)]:rounded-l-md first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
            : "[&:has([aria-selected])]:rounded-md"
        ),
        day: cn(
          buttonVariants({ variant: "ghost" }),
          "size-8 p-0 font-normal aria-selected:opacity-100"
        ),
        day_range_start:
          "day-range-start aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_range_end:
          "day-range-end aria-selected:bg-primary aria-selected:text-primary-foreground",
        day_selected:
          "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
        day_today: "bg-accent text-accent-foreground",
        day_outside:
          "day-outside text-muted-foreground aria-selected:text-muted-foreground",
        day_disabled: "text-muted-foreground opacity-50",
        day_range_middle:
          "aria-selected:bg-accent aria-selected:text-accent-foreground",
        day_hidden: "invisible",
        caption_dropdowns:"flex gap-1",
        ...classNames,

      }}
      components={{
        IconLeft: ({ className, ...props }) => (
          <ChevronLeft className={cn("size-4", className)} {...props} />
        ),
        IconRight: ({ className, ...props }) => (
          <ChevronRight className={cn("size-4", className)} {...props} />
        ),
        Dropdown:(props)=> {
          
          const {fromDate, fromMonth, fromYear, toDate, toMonth, toYear} = useDayPicker();

          const { goToMonth, currentMonth } = useNavigation();

          if(props.name === "months"){
            const selectItems = Array.from({ length: 12 }, (_, i) =>( {
              value: i.toString(),
              label: format(setMonth(new Date(), i), "MMM"),
            }));
            return (<Select value={props.value?.toString()} onValueChange={(newValue)=>{
              const newDate = new Date(currentMonth) 
              newDate.setMonth(parseInt(newValue))
              goToMonth(newDate);
              }}>
                      <SelectTrigger className="w-auto"> {format(currentMonth, "MMM")} </SelectTrigger>
                      <SelectContent>

                      {selectItems.map((item) => (
                          <SelectItem value={item.value}> {item.label}</SelectItem>))}
                      </SelectContent>
            </Select>)
          }else if(props.name === "years"){
            const earliestYear = fromYear || fromMonth.getFullYear() || fromDate.getFullYear();
            const latestYear = toYear || toMonth.getFullYear() || toDate.getFullYear();

            let selectItems:{label:string, value:string}[] = [];
            if(earliestYear && latestYear){
              const yearsLength = latestYear - earliestYear + 1;
              selectItems = Array.from({ length: yearsLength }, (_, i) => ({
                label : (earliestYear + i).toString(),
                value:  (earliestYear + i).toString(),
            }))
          } 
            return  (<Select onValueChange={(newValue)=>{
              const newDate = new Date(currentMonth) 
              newDate.setFullYear(parseInt(newValue))
              goToMonth(newDate);
              }} value={props.value?.toString()}>
              <SelectTrigger className="w-auto"> {currentMonth.getFullYear()}</SelectTrigger>
              <SelectContent>

              {selectItems.map((item) => (
                  <SelectItem value={item.value}> {item.label}</SelectItem>))}
              </SelectContent>
            </Select>)
        }
        return null },
      }}
      {...props}
    />
  )
}

export { Calendar }
